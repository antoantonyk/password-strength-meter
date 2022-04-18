import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: ".psm__progress-bar",
})
export class ProgressBarDirective {
  @Input()
  numberOfProgressBarItems: number;

  @Input()
  passwordStrength: number;

  @Input()
  colors: string[] = [];

  progressBar: HTMLDivElement;

  private defaultColors = [
    "darkred",
    "orangered",
    "orange",
    "yellowgreen",
    "green",
  ];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLDivElement>
  ) {
    this.progressBar = this.el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.numberOfProgressBarItems) {
      this.setProgressBarItems();
    }

    this.setProgressBar();
  }

  setProgressBarItems() {
    const progressBarItemContainer = this.progressBar.querySelector(
      ".psm__progress-bar-items"
    );
    const width = 100 / this.numberOfProgressBarItems;

    progressBarItemContainer.childNodes.forEach((item) => {
      this.renderer.removeChild(progressBarItemContainer, item);
    });

    Array(this.numberOfProgressBarItems)
      .fill(1)
      .forEach((_) => {
        const progressBarItem = this.renderer.createElement("div");
        this.renderer.addClass(progressBarItem, "psm__progress-bar-item");
        this.renderer.setStyle(progressBarItem, "width", `${width}%`);
        this.renderer.appendChild(progressBarItemContainer, progressBarItem);
      });
  }

  setProgressBar() {
    const progressBarOverlayWidth = this.getFillMeterWidth(
      this.passwordStrength
    );
    const progressBarOverlayWidthInPx = `${progressBarOverlayWidth}%`;

    const progressLevelBasedOnItems =
      (progressBarOverlayWidth / 100) * this.numberOfProgressBarItems;
    const progressBarOverlayColor = this.getMeterFillColor(
      progressLevelBasedOnItems
    );

    this.renderer.setAttribute(
      this.progressBar,
      "aria-valuenow",
      progressBarOverlayWidthInPx
    );
    this.renderer.setAttribute(
      this.progressBar,
      "data-strength",
      `${this.passwordStrength || "0"}`
    );

    const overlayElement = this.progressBar.querySelector<HTMLDivElement>(
      ".psm__progress-bar-overlay"
    );

    if (overlayElement) {
      this.renderer.setStyle(
        overlayElement,
        "width",
        progressBarOverlayWidthInPx
      );

      this.renderer.setStyle(
        overlayElement,
        "background-color",
        progressBarOverlayColor
      );
    }
  }

  getFillMeterWidth(strength: number): number {
    if (strength === null || strength === undefined) {
      return 0;
    }

    const strengthInPercentage =
      strength !== null ? ((strength + 1) / 5) * 100 : 0;

    const roundedStrengthInPercentage = this.getRoundedStrength(
      strengthInPercentage,
      100 / this.numberOfProgressBarItems
    );
    return roundedStrengthInPercentage;
  }

  getMeterFillColor(progressLevel: number) {
    if (
      !progressLevel ||
      progressLevel <= 0 ||
      (progressLevel > this.colors.length &&
        progressLevel > this.defaultColors.length)
    ) {
      return this.colors[0] ? this.colors[0] : this.defaultColors[0];
    }

    const index = progressLevel - 1;

    return this.colors[index] ? this.colors[index] : this.defaultColors[index];
  }

  private getRoundedStrength(strength: number, roundTo: number): number {
    return Math.round(strength / roundTo) * roundTo;
  }
}
