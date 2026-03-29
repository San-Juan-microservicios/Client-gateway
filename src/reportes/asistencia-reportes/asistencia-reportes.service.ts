import { Injectable } from '@nestjs/common';
import { CreateAsistenciaReporteDto } from './dto/create-asistencia-reporte.dto';
import { UpdateAsistenciaReporteDto } from './dto/update-asistencia-reporte.dto';

@Injectable()
export class AsistenciaReportesService {
  create(createAsistenciaReporteDto: CreateAsistenciaReporteDto) {
    return 'This action adds a new asistenciaReporte';
  }

  findAll() {
    return `This action returns all asistenciaReportes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistenciaReporte`;
  }

  update(id: number, updateAsistenciaReporteDto: UpdateAsistenciaReporteDto) {
    return `This action updates a #${id} asistenciaReporte`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistenciaReporte`;
  }
}
