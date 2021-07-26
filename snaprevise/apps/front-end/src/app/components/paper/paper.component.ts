import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IModule, IModuleUM, IPaper } from '../../interfaces';
import { DropResult } from 'ngx-smooth-dnd';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ModuleService, PaperService } from '../../services';
import { tap } from 'rxjs/operators';
import { useUnsubscribable } from '../../decorators';
import { untilDestroyed } from '../../operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'snaprevise-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@useUnsubscribable()
export class PaperComponent implements OnInit {

  @Input()
  public paper!: IPaper;

  public modules: IModule[] = [];

  constructor(
    protected readonly paperService: PaperService,
    protected readonly moduleService: ModuleService,
    protected readonly cdr: ChangeDetectorRef
  ) {
  }

  /**
   * Call api by paper.id to get list module for display
   * @return void
   */
  public ngOnInit(): void {
    this.paperService.findById(this.paper.id)
      .pipe(
        tap((data) => {
          this.modules = data.modules;
          this.cdr.detectChanges();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  /**
   * get data of each module
   * @param index: number - position of each module
   * @return IModule - data of each module
   */
  public usePayload(): (index: number) => IModule {
    return (index: number): IModule => {
      return this.modules[index];
    };
  }

  /**
   * change position and call api after drop item to another place
   * @param event: DropResult - output event drop
   * @return void
   */
  public useDrop = (event: DropResult): void => {
    if (event.removedIndex != null && event.addedIndex != null) {
      const add = this.modules[event.addedIndex];
      const remove = this.modules[event.removedIndex];
      forkJoin([
        this.paperService.update({ id: add?.id, position: remove.position } as IModuleUM),
        this.paperService.update({ id: remove?.id, position: add.position } as IModuleUM)
      ]).pipe(
        tap(() => {
          moveItemInArray(this.modules, event.removedIndex as number, event.addedIndex as number);
          this.cdr.detectChanges();
        }),
        untilDestroyed(this)
      ).subscribe();
    } else {
      if (event.addedIndex != null) {
        const data = { ...event.payload, paperId: this.paper.id, position: event.addedIndex } as IModuleUM;
        (data as any)['updateAll'] = true;
        this.moduleService.update(data as IModuleUM)
          .pipe(
            tap((data) => {
              this.modules = (data as IModule[]).filter((e: any) => e['paperId'] === this.paper.id);
              this.cdr.detectChanges();
            })
          )
          .subscribe();
      }
      if (event.removedIndex != null) {
        this.modules = this.modules.filter((module) => module.id !== event.payload.id);
        this.cdr.detectChanges();
      }
    }
  };
}
