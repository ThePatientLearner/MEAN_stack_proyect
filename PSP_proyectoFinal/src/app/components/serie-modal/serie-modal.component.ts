import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {ApiResponseCategorias, Categoria, Serie} from '../../common/series';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../services/data.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {VerSeriesComponent} from '../ver-series/ver-series.component';

@Component({
  selector: 'app-serie-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FaIconComponent
  ],
  templateUrl: './serie-modal.component.html',
  styleUrl: './serie-modal.component.css'
})
export class SerieModalComponent implements OnInit{
  @Input()serie!: Serie;
  @Input({required: true}) categorias!: Categoria[];
  @Input({required: true}) editar: boolean = false;
  activeModal = inject(NgbActiveModal);
  categoriasDisponibles: Categoria[] = [];
  categoriasAuxiliar: Categoria[] = [];

  private readonly dataService: DataService = inject(DataService)
  private readonly  formBuilder: FormBuilder = inject(FormBuilder);
  formSerie: FormGroup = this.formBuilder.group({
    _id: [''],
    titulo: ['', Validators.required],
    imagenes: [[]],
    categorias: [[]],
    numeroCapitulos: [],
    fechaEmision: [''],
    sinopsis: ['']
  })

  myNewCategoria = this.formBuilder.group({
    nombre: [''],
    imagen: ['']
  });


  //getters
  get titulo(): any{return this.formSerie.get('titulo')}
  get imagenes(): any{return this.formSerie.get('imagenes')}
  get categoriasF(): any{return this.formSerie.get('categorias')}
  get numeroCapitulos(): any{return this.formSerie.get('numeroCapitulos')}
  get fechaEmision(): any{return this.formSerie.get('fechaEmision')}
  get sinopsis(): any{return this.formSerie.get('sinopsis')}
  get newCategoriaNombre(): any { return this.myNewCategoria.get('nombre') }
  get newCategoriaImagen(): any { return this.myNewCategoria.get('imagen') }

  onCanel():void {
    //hago esto para ver el objeto que devuelve
    console.log(this.formSerie.getRawValue())
  }

  onSubmit():void{
    console.log(this.formSerie.getRawValue())
    if(this.editar){
      // Si estamos editando, enviamos todos los datos incluyendo el _id
      this.dataService.updateMovie(this.formSerie.getRawValue()).subscribe({
        next: value => {
          console.log(value)
          location.reload();
        },
        error: err => {
          console.error(err)
        }
      });
    } else {
      // Si estamos creando, eliminamos el _id del objeto antes de enviarlo
      const formData = this.formSerie.getRawValue();
      delete formData._id;  // Eliminamos el _id para nueva serie

      this.dataService.addMovie(formData).subscribe({
        next: value => {
          console.log(value)
          location.reload();
        },
        error: err => {
          console.log(err)
        }
      });
    }
    this.activeModal.dismiss();
  }
  protected loadCategorias() {
    this.dataService.getCategorias().subscribe({
      next: (response: ApiResponseCategorias) => {
        // Filtrar categorías que están duplicadas, nos llegaban del backend sin filtrar
        const categoriasUnicas = Array.from(
          new Set(
            response.data?.map(cat => cat.nombre)
          )
        ).map(nombre => {
          return response.data?.find(cat => cat.nombre === nombre);
        });

        this.categoriasDisponibles = categoriasUnicas.filter(cat => cat !== undefined) || [];
        this.categoriasAuxiliar = [...this.categoriasDisponibles];
      },
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    if (this.editar && this.serie) {
      // Usar patchValue en lugar de setValue para una actualización parcial
      this.formSerie.patchValue(this.serie);
    }
    // Cargar categorías independientemente del modo
    this.loadCategorias();
    // para manejr los errorees
    if (!this.formSerie.valid) {
      return;
    }

    const request = this.editar ?
      this.dataService.updateMovie(this.formSerie.getRawValue()) :
      this.dataService.addMovie(this.formSerie.getRawValue());


  }


  addCategoria() {
    const nombre = this.newCategoriaNombre.value;
    const imagen = this.newCategoriaImagen.value || '../../../public/imagenNoEncontrada.jpg';

    if (!nombre.trim()) return;

    // 1. Crear objeto tipo Categoria
    const newCategoria: Categoria = {
      nombre: nombre,
      imagen: imagen
    };

    // 2. Agregar a categoriasDisponibles y actualizar la vista
    if (!this.categoriasDisponibles.some(cat => cat.nombre === nombre)) {
      this.categoriasDisponibles = [...this.categoriasDisponibles, newCategoria];
      this.categoriasAuxiliar = [...this.categoriasDisponibles];

      // Actualizar el formulario si es necesario
      const currentCategorias = this.formSerie.get('categorias')?.value || [];
      this.formSerie.patchValue({
        categorias: [...currentCategorias, newCategoria]
      });
    }

    // Limpiar el formulario de nueva categoría
    this.myNewCategoria.reset();
  }

  addImage(imageUrl: string) {
    console.log(this.imagenes.value);
    const currentImages = this.formSerie.getRawValue().imagenes || [];
    if (imageUrl && imageUrl.trim()) {
      currentImages.push(imageUrl);
      this.formSerie.patchValue({
        imagenes: currentImages
      });
      (document.getElementById('newImage') as HTMLInputElement).value = ''; //con esto boro el texto que aparece en el modal al meter una nueva
    }
  }


  removeImage(index: number) {
    const currentImages = this.formSerie.getRawValue().imagenes;
    if (currentImages && currentImages.length > index) {
      currentImages.splice(index, 1);
      this.formSerie.patchValue({
        imagenes: currentImages
      });
    }
  }





  protected readonly faPlusCircle = faPlusCircle;
}
