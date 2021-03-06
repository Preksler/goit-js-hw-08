import Player from '@vimeo/player';
import _ from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', _.throttle(saveCurrentTime, 1000));
player.on('loaded', getCurrentTime);

function saveCurrentTime() {
    player.getCurrentTime().then(function (seconds) {
        localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
    });
};

function getCurrentTime() {
    const currentTime = localStorage.getItem(LOCAL_STORAGE_KEY);
    player.setCurrentTime(currentTime);
}