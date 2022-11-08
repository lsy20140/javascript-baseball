const { Random, Console } = require("@woowacourse/mission-utils");
class App {

  constructor() {
    this.computerInputNums = [];
    this.userInputNums = [];
  }
  
  computerInput(){
    const computer = [];
    while (computer.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
    this.computerInputNums = computer;
  }

  checkUserInput(userInput){
    //const isValidArr = userInput.map(e => e=Number.isNaN(e));
    if(userInput.length!==3) throw new Error("3자리의 수를 입력해주세요.");
    //if(isValidArr.includes(true)) return false;
    if(new Set(userInput).size!==3) throw new Error("중복된 숫자가 없도록 입력해주세요.");
    if(userInput.includes(0)) throw new Error("1~9 범위의 숫자로 구성된 수를 입력해주세요.");
  }

  userInput(){
    return Console.readLine('숫자를 입력해주세요 : ',(input) => {
      this.checkUserInput(input);
      this.compareInput(input);
      Console.close();
      })
  }

  askRestartOrQuit(){
    Console.print("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.");
    Console.readLine('', (answer) => {
      if(answer == 1) return this.startGame();
      if(answer == 2) return Console.print("게임 종료");
    })
  }



  compareInput(userInput){
    this.userInputNums = userInput;
    const subtractArr = this.computerInputNums.map((x,y) => x-this.userInputNums[y]);
    const zeroCount = subtractArr.reduce((count, data) => data == 0 ? count + 1 : count, 0);
    if(zeroCount == 3){
      Console.print("3스트라이크");
      Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
      return this.askRestartOrQuit();
    }

    this.getHint();

    return this.userInput();

  }

  getHint(){
    let strikeCount = 0;
    let ballCount = 0;

    let subtractArr = this.computerInputNums.map((x,y) => x-this.userInputNums[y]);
    let zeroCount = subtractArr.reduce((count, data) => data == 0 ? count + 1 : count, 0);

    let difference = this.computerInputNums.filter(x => !this.userInputNums.includes(x));

    strikeCount = zeroCount;
    ballCount = 3-strikeCount-difference.length;

    if(ballCount != 0 && strikeCount !=0) return Console.print(`${ballCount}볼 ${strikeCount}스트라이크`);
    if(ballCount != 0 && strikeCount == 0) return Console.print(`${ballCount}볼`);
    if(ballCount == 0 && strikeCount != 0) return Console.print(`${strikeCount}스트라이크`);
    
    return Console.print("낫싱");

  }


  play(){
    Console.print("숫자 야구 게임을 시작합니다.");
    this.startGame();
  }

  startGame(){
    this.computerInput();
    this.userInput();
  }
}

module.exports = App;
