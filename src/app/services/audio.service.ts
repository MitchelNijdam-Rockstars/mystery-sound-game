import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio = new Audio();
  private audioEndedSource = new Subject<void>();
  audioEnded$ = this.audioEndedSource.asObservable();

  constructor() {
    this.audio.addEventListener('ended', () => this.audioEndedSource.next());
  }

  play(url: string) {
    this.audio.src = url;
    this.audio.load();
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
