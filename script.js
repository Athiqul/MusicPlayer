const container=document.querySelector('.music-container');
const title=document.querySelector('#title');
const audio=document.querySelector('#audio');
const img=document.querySelector('#img');
const prev=document.querySelector('#prev');
const play=document.querySelector('#play');
const next=document.querySelector('#next');
const progress=document.querySelector('.progress-bar');

const songs=["ItsMyLife","MillionDreams","Something"];
var index=2;
loadSong(songs[index]);
//Initially song load from files
function loadSong(song){
   title.innerHTML=song;
   audio.src=`music/${song}.mp3`;
   img.src=`img/${song}.jpg`;
}
//pausing song 
function pausing(){
    container.classList.remove('play');
    play.querySelector("i.fas").classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');
   audio.pause();
}
//resume song
function resume(){
    container.classList.add('play');
    play.querySelector("i.fas").classList.remove('fa-play');
    play.querySelector("i.fas").classList.add('fa-pause');
   audio.play();
}
//Play and pausing the Song
function playSong(){
  const checkClass=container.classList.contains('play');
  if(checkClass)
  {
      pausing();
  }
  else{
      resume();
  }
}
//Previous song play
function prevSong(){
   index--;
   if(index<0)
   {
       index=songs.length-1;
   }
   loadSong(songs[index]);
   audio.play();
   resume();
}
//Next Song Play
function nextSong(){
 index++;
 if(index>songs.length-1)
 {
     index=0;
 }
 loadSong(songs[index]);
 audio.play();
 resume();
}
//Update Progress bar
function updateProgress(e){
   const duration=e.srcElement.duration;
   const currentTime=e.srcElement.currentTime;
   var progressValue=(currentTime/duration)*100;
   progress.style.width=`${progressValue}%`;
}
//Update song with progress bar
function updateSong(e){
   const width=this.clientWidth;
   const currentPos=e.offsetX;
   const duration=audio.duration;
   const pPvalue=(currentPos/width)*duration;
   audio.currentTime=pPvalue;

}
//Event Handler
play.addEventListener("click",playSong);
prev.addEventListener("click",prevSong);
next.addEventListener("click",nextSong);
audio.addEventListener('timeupdate',updateProgress);
document.querySelector('.progress-container').addEventListener("click",updateSong);
audio.addEventListener("ended",nextSong);
