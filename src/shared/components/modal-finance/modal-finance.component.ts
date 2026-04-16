import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-modal-finance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-finance.component.html',
  styleUrls: ['./modal-finance.component.scss']
})
export class ModalFinanceComponent implements OnChanges {

  @Input() isOpen = false
  @Input() type: 'receita' | 'despesa' = 'receita'
  @Input() isEdit = false
  @Input() initialData: any = null

  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<any>()

  formData: any = {
    descricao: '',
    valor: 0,
    data: new Date().toISOString().split('T')[0],
    categoria: '',
    pagamento: ''
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isOpen'] && changes['isOpen'].currentValue) {
      if(this.isEdit && this.initialData) {
        this.formData = { ...this.initialData };
        if(this.formData.data && this.formData.data.includes('/')) {
             const parts = this.formData.data.split('/');
             this.formData.data = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        if(this.initialData.valorNum) {
             this.formData.valor = this.initialData.valorNum;
        }
      } else {
        this.formData = {
          descricao: '',
          valor: 0,
          data: new Date().toISOString().split('T')[0],
          categoria: '',
          pagamento: ''
        };
      }
    }
  }

  onClose(){
    this.close.emit()
  }

  onSave(){
    this.save.emit(this.formData)
    this.onClose()
  }

}