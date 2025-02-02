import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DataService} from '../../services/data.service';
import {ApiResponseSeries, Categoria, Serie} from '../../common/series';
import {DatePipe, NgClass} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SerieModalComponent} from '../serie-modal/serie-modal.component';


@Component({
  selector: 'app-ver-series',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    FaIconComponent,
    SerieModalComponent, DatePipe
  ],
  templateUrl: './ver-series.component.html',
  styleUrl: './ver-series.component.css'
})
export class VerSeriesComponent {
  private readonly dataService : DataService = inject(DataService)
  private readonly modalService: NgbModal =inject(NgbModal);


  series: Serie[] = []
  categorias: Categoria[] = []
  data!: ApiResponseSeries;
  protected readonly faTrashCan = faTrashCan;
  serie?: Serie;

  ngOnInit(){
    //this.loadSeries();
    this.loadSeries();
    this.loadCategorias();
  }

  public loadSeries() {
    this.dataService.getData().subscribe({
      next: value => {
        this.data = value;
        // Ordenar las series por fecha de emisión de más reciente a más antigua
        this.series = value.data.sort((a, b) => {
          const dateA = new Date(a.fechaEmision);
          const dateB = new Date(b.fechaEmision);
          return dateB.getTime() - dateA.getTime();
        });
      },
      error: err => {
        console.error(err);
      }
    });
  }


  protected loadCategorias(){
    this.dataService.getCategorias().subscribe({

        next: value => {
          console.log(value)
          this.categorias = value.data;
        },
        complete: () => {
          console.log('Genres loaded!')
          console.log()
        },
        error: err => {
          console.error(err);
        }
      }
    )
  }


  editarSerie(serie: string) {

  }

  borrarSerie(serie: Serie) {
    if(confirm('Are you sure that you want to delete the movie ' + serie.titulo+'?')){
      this.dataService.deleteMovie(serie._id).subscribe(
        {
          next: value => {
            console.log(value)
          },
          error: err=> {
            console.error(err)
          }
        }
      )
    }
  }




  loadSerie(serie: Serie) {
    this.loadModal(serie);
  }

  newSerie() {
    this.loadModal();

  }

  private loadModal(serie?: Serie) {
    const modalRef = this.modalService.open(SerieModalComponent);
    if (serie){
      modalRef.componentInstance.serie = serie;
      modalRef.componentInstance.editar = true;
    }else{
      modalRef.componentInstance.editar = false;
    }
    modalRef.componentInstance.genres = this.categorias

    //cerrando modal
    modalRef.result.then(() => this.loadSeries())
      .catch(() => this.loadSeries())
  }



  removeSerie(serie: Serie) {
    if (confirm(`¿Estás seguro de que quieres borrar la serie "${serie.titulo}"?`)) {
      this.dataService.deleteMovie(serie._id).subscribe({
        next: (response) => {
          console.log('Serie eliminada:', response.message);
          this.loadSeries()
        },
        error: (err) => {
          console.error('Error al borrar la Serie:', err);
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
      });
    }
  }
}

