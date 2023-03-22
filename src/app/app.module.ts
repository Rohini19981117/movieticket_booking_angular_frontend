import { MovieService } from './Services/movie.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderMovieComponent } from './Pages/order-movie/order-movie.component';
import { OrderHistoryComponent } from './Pages/order-history/order-history.component';
import { SingleOrderDetailsComponent } from './Pages/order-history/single-order-details/single-order-details.component';
import {HttpClientModule} from '@angular/common/http';
import { ReviewComponent } from './Shared folder/review-component/review-component.component';
import { DiscountFormComponent } from './Pages/discount-form/discount-form.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { ReviewStarComponent } from './Shared folder/review-star/review-star.component';
import { ReviewCommentComponent } from './Shared folder/review-comment/review-comment.component';
import { HeaderComponent } from './Shared folder/header/header.component';
import { FooterComponent } from './Shared folder/footer/footer.component';
import { MovieFilterPipe } from './pipes/movie-filter.pipe';
import { ShowAllMovieComponent } from './Pages/show-all-movie/show-all-movie.component';
import { MovieDetailsComponent } from './Pages/movie-details/movie-details.component';
import { BookingComponent } from './Pages/booking/booking.component';
import { SeatscontinerComponent } from './Pages/booking/seatscontiner/seatscontiner.component';
import { DeleteMoviesComponent } from './Pages/delete-movies/delete-movies.component';
import { AddMoviesComponent } from './Pages/add-movies/add-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderMovieComponent,
    OrderHistoryComponent,
    SingleOrderDetailsComponent,
    ReviewComponent,
    DiscountFormComponent,
    HomepageComponent,
    ReviewStarComponent,
    ReviewCommentComponent,
    HeaderComponent,
    FooterComponent,
    MovieFilterPipe,
    ShowAllMovieComponent,
    MovieDetailsComponent,
    BookingComponent,
    SeatscontinerComponent,
    DeleteMoviesComponent,
    AddMoviesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
