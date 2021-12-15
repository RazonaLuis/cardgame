const triggerBtn = document.querySelector('.js-trigger');
const catList = document.querySelector('.js-catList');
let nameText = document.querySelector('.js-nametext');
let correctText = document.querySelector('.js-correct-text');
let failText = document.querySelector('.js-incorrect-text');
let count = 0;
let resCount = 0;
let failCount = 0;
let randomNameAry = [];
let randomImgAry = [];
let catsArry = cats.concat(cats);

class catGame {
  constructor(target,list,finishWord){
    this.target = target;
    this.list = list;
  }

  // リセット関数
  reset() {
    resCount = 0;
    failCount = 0;
    count = 0;
    this.list.innerHTML = '';
    correctText.textContent = '正解数：0回';
    failText.textContent = '不正解数：0回';
    randomNameAry = [];
    randomImgAry = [];
    this.target.disabled = false;
  }

  // 重複しないランダム数字の関数
  randomNum(ary) {
    const max = catsArry.length;
    for(let i = 0; i < max; i++){
      while(true){
        var num = ~~(Math.random() * max);
        if(!ary.includes(num)){
          ary.push(num);
          break;
        }
      }
    }
  }

  // 正解、不正解を出すための関数
  checkCats(nums) {
    if (nums[0] == nums[1] + cats.length || nums[0] == nums[1] - cats.length) {
      resCount++;
      correctText.textContent = `正解数：${resCount}回`;
      return "correct"
    }else{
      failCount++;
      failText.textContent = `不正解数：${failCount}回`;
    }
  }

  // 画像をランダムに表示するための関数
  catImages() {
    this.randomNum(randomImgAry);
    let domHtml = '';
    randomImgAry.forEach(num => {
      domHtml += 
        `<li class="parent-card js-catItem" data-src="${num}"><div class="front-card">card</div><div class="back-card"><img src="${catsArry[num].image}" alt="${catsArry[num].name}"></div></li>`;
      this.list.innerHTML = domHtml;
    });
  }

  // 画像を押したときの処理関数
  imageEvent(){
    let catItems = document.querySelectorAll('.js-catItem');
    let keyNum = [];
    catItems.forEach(catItem => {
      // 画像が浮き出るようにするエフェクト
      setTimeout(() => {
        catItem.classList.add('visibility');
      }, 500);

      setTimeout(() => {
        catItem.classList.add('shadow');
      }, 600);

      setTimeout(() => {
        catItem.classList.remove('shadow');
      }, 2000);
      
      catItem.addEventListener('click', (e) => {
        const $this = e.currentTarget;
        $this.classList.add('flipped');
        if (!$this.classList.contains('selected') && !$this.classList.contains('done')) {
          keyNum.push(Number($this.getAttribute('data-src')));
          // countで何回やっているのかを数える
          count++;
          $this.classList.add('selected');
          if (count % 2 == 0) {
            let res = this.checkCats(keyNum);
            let selectedItems = document.querySelectorAll('.selected');
            selectedItems.forEach(selectedItem => {
              if (res == "correct") {
                selectedItem.classList.add('done');
              }else if(res == "finish"){
                selectedItem.classList.add('done');
              }
              selectedItem.classList.remove('selected');
              // この作業には時差を付ける
              setTimeout(() => {
                selectedItem.classList.remove('flipped');
              }, 2000);
            });
            keyNum = [];
          }
          
          // 最後までいったか確認
          if (resCount == cats.length) {
            let lastWords = 'FishじゃなくてFinishだにゃん!\n';
            let score = failCount / cats.length;
            // スコアの仕分け
            if (score <= 0.5) {
              score = "人間という下級種族の割には良く我々のことを知ってるな！誉めてやろう！";
            }else if (score <= 0.7) {
              score = "人間という下級種族の割にはがんばったな！";
            }else{
              score = "二度とワシの前に現れるな！";
            }
           
            lastWords += score;
            setTimeout(() => {
              this.reset();
              alert(lastWords);
            }, 2000);
          }
        }
      })
    });
  }
}

// クラスのインスタンス
let catEvent = new catGame(triggerBtn,catList);
// イベントの追加
triggerBtn.addEventListener('click',function () {
  catEvent.reset();
  this.disabled = true;
  catEvent.catImages();
  // catEvent.catName();
  catEvent.imageEvent();
});

