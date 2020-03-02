import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FixedpluginComponent } from './fixedplugin.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [ RouterModule, CommonModule, 
        // NgbModule 
    ],
    declarations: [ FixedpluginComponent ],
    exports: [ FixedpluginComponent ]
})

export class FixedPluginModule {}
