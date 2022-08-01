import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { MinistriesComponent } from './ministries/ministries.component';
import { PlanAVisitComponent } from './plan-a-visit/plan-a-visit.component';
import { UnderContructionComponent } from './shared/components/under-contruction/under-contruction.component';
import { GiveComponent } from './give/give.component';
import { ServicesComponent } from './services/services.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'ministries', component: MinistriesComponent },
  { path: 'planavisit', component: PlanAVisitComponent },
  { path: 'globalmissions', component: UnderContructionComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'watch', component: WatchComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'give', component: GiveComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
