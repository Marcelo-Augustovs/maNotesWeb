import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-modal-finance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-finance.component.html',
  styleUrls: ['./modal-finance.component.scss']
})
export class ModalFinanceComponent {

  @Input() isOpen = false
  @Input() type: 'receita' | 'despesa' = 'receita'

  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<any>()

  formData: any = {
    descricao: '',
    valor: 0,
    data: new Date(),
    categoria: ''
  }

  onClose(){
    this.close.emit()
  }

  onSave(){
    this.save.emit(this.formData)
    this.onClose()
  }

}