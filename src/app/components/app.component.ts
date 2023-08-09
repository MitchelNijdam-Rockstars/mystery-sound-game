import {Component} from '@angular/core';

class MusicQuestions {
  assetLocation: string

  constructor(assetName: string, public answers: Answer[]) {
    this.assetLocation = `assets/sounds/${assetName}.mp3`;
  }
}

class Answer {
  constructor(public text: string, public isCorrect: boolean = false, public isChosen: boolean = false) {
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly musicQuestions: MusicQuestions[] = [
    new MusicQuestions('deo', [
      new Answer('Old TV'),
      new Answer('Broken Radio'),
      new Answer('Deodorant', true),
      new Answer('Graffiti')
    ]),
    new MusicQuestions('keys', [
      new Answer('Doorbell'),
      new Answer('Necklace'),
      new Answer('Bells'),
      new Answer('Keys', true)
    ]),
    new MusicQuestions('mouse', [
      new Answer('Mouse', true),
      new Answer('Button'),
      new Answer('Clock'),
      new Answer('Pen clicking')
    ]),
    new MusicQuestions('pasta', [
      new Answer('Rain'),
      new Answer('Pasta', true),
      new Answer('Mud'),
      new Answer('Water')
    ])
  ];

  currentQuestion: MusicQuestions;

  constructor() {
    this.musicQuestions.sort(() => Math.random() - 0.5);
    this.currentQuestion = this.musicQuestions[0];
  }

  checkAnswer(answer: Answer) {
    answer.isChosen = true;

    if (answer.isCorrect) {
      setTimeout(() => {
        this.setNextQuestion();
        this.resetAnswers(answer);
      }, 1500);
    }
  }

  private resetAnswers(answer: Answer) {
    this.musicQuestions.find(question => question.answers.indexOf(answer) != -1)!
      .answers.forEach(answer => answer.isChosen = false);
  }

  private setNextQuestion() {
    const index = this.musicQuestions.indexOf(this.currentQuestion);
    if (index < this.musicQuestions.length - 1) {
      this.currentQuestion = this.musicQuestions[index + 1];
    } else {
      this.currentQuestion = this.musicQuestions[0];
    }
  }
}
