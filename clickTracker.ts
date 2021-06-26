import { fromEvent } from "rxjs";
import { sampleTime, map } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe(
  sampleTime(4000),
  map(({clientX, clientY})=> ({
    clientX, clientY
  }))
).subscribe(console.log);
