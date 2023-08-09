import {Component, Input, OnDestroy} from '@angular/core';
import {AudioService} from "../../services/audio.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'music-player',
    templateUrl: './music-player.component.html',
    styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnDestroy {

    @Input() assetLocation!: string;

    private audioEndSubscription: Subscription;

    isPlaying = false;

    constructor(private audioService: AudioService) {
        this.audioEndSubscription = this.audioService.audioEnded$.subscribe(() => {
            this.isPlaying = false;
        });
    }

    ngOnDestroy() {
        this.audioEndSubscription.unsubscribe();
    }

    play() {
        this.audioService.play(this.assetLocation);
        this.isPlaying = true;
    }

    stop() {
        this.audioService.stop();
        this.isPlaying = false;
    }

    togglePlay() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
    }
}
