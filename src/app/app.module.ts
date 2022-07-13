import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { MapComponent } from './map/map.component';
import { ProductsComponent } from './products/products.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import { TestComponent } from './test/test.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryButtonComponent } from './enquiry-button/enquiry-button.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MatTabsModule } from '@angular/material/tabs';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SolarComponent } from './solar/solar.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    CarouselComponent,
    FooterComponent,
    FormComponent,
    MapComponent,
    ProductsComponent,
    ContactUsComponent,
    HeaderComponent,
    TestComponent,
    DashboardComponent,
    EnquiryButtonComponent,
    SubHeaderComponent,
    SolarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AgmCoreModule,
    MatTabsModule,
    NgxImageZoomModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatMenuModule,
    NgbModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNdQJTGsGg1HC_cwCKh_mmFUMTCWxJ_NM',
    }),
    LayoutModule,
    MatButtonModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent],
})
export class AppModule {}
