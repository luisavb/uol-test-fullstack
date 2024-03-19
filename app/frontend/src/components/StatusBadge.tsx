import React from 'react';
//style
import { Badge } from 'flowbite-react';
import { HiCheck, HiDotsCircleHorizontal, HiMinusCircle, HiXCircle } from 'react-icons/hi';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let badge;
  let color = '';

  switch (status) {
    case 'Ativo':
      badge = HiCheck;
      color = 'green';
      break;
    case 'Inativo':
      badge = HiXCircle;
      color = 'red';
      break;
    case 'Aguardando Ativação':
      badge = HiDotsCircleHorizontal;
      color = 'yellow';
      break;
    case 'Desativado':
      badge = HiMinusCircle;
      color = 'gray';
        break;
    default:
      color = 'gray';
  }

  return (
    <>
    <div className="flex flex-wrap gap-2">
      <Badge icon={badge} color= {color}>{status}</Badge>
    </div>
    </>
  );
}

export default StatusBadge;