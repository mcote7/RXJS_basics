console.clear();

// begin lesson code
import { fromEvent } from 'rxjs';
import { map, throttleTime, tap } from 'rxjs/operators';

/*
 * Calculate progress based on scroll position
 */
function calculateScrollPercent(element: HTMLElement) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// elems
const progressBar: any = document.querySelector('.progress-bar');

// streams
const scroll$ = fromEvent(document, 'scroll');

const progress$ = scroll$.pipe(
  /*
   * For every scroll event, we use our helper function to 
   * map to a current scroll progress value.
   * THROTTLE TIME reduces the amount of time the function is called
   */
  throttleTime(30),
  map(({ target }: any) => calculateScrollPercent(target.scrollingElement)),
  tap(console.log) 
);
/*
 * We can then take the emitted percent and set the width
 * on our progress bar.
 */
progress$.subscribe(percent => {
  progressBar.style.width = `${percent}%`;
});
