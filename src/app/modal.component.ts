/* Adapted from http://blog.rangle.io/dynamically-creating-components-with-angular-2/ */

import {
  Component, Input, ViewChild, ReflectiveInjector, ViewContainerRef,
  ComponentFactoryResolver, HostBinding, OnInit
} from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { LoginComponent } from './login.component';
import { ProblemComponent } from './problem.component';
import { ModalService } from './modal.service';

@Component({
  selector: 'modal',
  entryComponents: [ LoginComponent, ProblemComponent ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer: ViewContainerRef;
  @Input() title: string;
  @HostBinding('class.active') currentComponent = null;

  constructor(private resolver: ComponentFactoryResolver, private modalService: ModalService) { }

  ngOnInit() : void {
    this.modalService.setup(this);
  }

  update(title: string, componentClass: any, inputs: any) : void {
    if (componentClass == null) {
      this.currentComponent = null;
      return;
    }

    this.componentContainer.clear();
    this.title = title;

    let inputProviders = Object.keys(inputs).map((inputName) => { return {
      provide: inputName,
      useValue: inputs[inputName]};
    });
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.componentContainer.parentInjector);
    let factory = this.resolver.resolveComponentFactory(componentClass);
    let component = factory.create(injector);

    this.componentContainer.insert(component.hostView);
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }
}
