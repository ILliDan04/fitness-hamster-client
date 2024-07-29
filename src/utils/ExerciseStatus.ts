class ExerciseStatus extends EventTarget {
  private _reps = 0;
  private _repInProgress = false;
  private _progress = 0;
  private _time = 0;

  private emitRepsChangeEvent() {
    this.dispatchEvent(new CustomEvent("repschange", { detail: this._reps }));
  }
  private emitProgressChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("progresschange", { detail: this._progress })
    );
  }
  private emitTimeChangeEvent() {
    this.dispatchEvent(new CustomEvent("timechange", { detail: this._time }));
  }

  public setReps(reps: number) {
    this._reps = reps;
    this.emitRepsChangeEvent();
  }
  public setProgress(progress: number) {
    this._progress = progress;
    this.emitProgressChangeEvent();
  }
  public setTime(time: number) {
    this._time = time;
    this.emitTimeChangeEvent();
  }
  public setRepInProgress(repInProgress: boolean) {
    this._repInProgress = repInProgress;
  }

  public get reps() {
    return this._reps;
  }
  public get repInProgress() {
    return this._repInProgress;
  }

  addEventListener(
    type: "repschange" | "progresschange" | "timechange",
    callback: (e: CustomEvent<number>) => void,
    options?: AddEventListenerOptions | boolean
  ): void;
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ): void;
  addEventListener(
    type: string,
    callback:
      | EventListenerOrEventListenerObject
      | null
      | ((e: CustomEvent<number>) => void),
    options?: AddEventListenerOptions | boolean
  ) {
    super.addEventListener(
      type,
      callback as EventListenerOrEventListenerObject,
      options
    );
  }

  removeEventListener(
    type: "repschange" | "progresschange" | "timechange",
    callback: (e: CustomEvent<number>) => void,
    options?: AddEventListenerOptions | boolean
  ): void;
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ): void;
  removeEventListener(
    type: string,
    callback:
      | EventListenerOrEventListenerObject
      | null
      | ((e: CustomEvent<number>) => void),
    options?: AddEventListenerOptions | boolean
  ) {
    super.removeEventListener(
      type,
      callback as EventListenerOrEventListenerObject,
      options
    );
  }
}

export default ExerciseStatus;
