import { NgModule } from '@angular/core';
import { PhonePipe } from './phone/phone';
import { ReversePipe } from './reverse/reverse';
@NgModule({
	declarations: [PhonePipe,
    ReversePipe],
	imports: [],
	exports: [PhonePipe,
    ReversePipe]
})
export class PipesModule {}
