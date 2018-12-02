import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appBlurrable]'
})
export class BlurrableDirective implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();

  constructor(public dialog: MatDialog, public renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.dialog.afterOpen.pipe(takeUntil(this.destroy$)).subscribe((openedDialog: MatDialogRef<any>) => {
      this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'blur(8px)');
      openedDialog.beforeClose().subscribe(() => {
        this.renderer.removeStyle(this.elementRef.nativeElement, 'filter');
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
