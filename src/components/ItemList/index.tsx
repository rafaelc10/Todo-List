import './ItemList.css'
import '../../tailwind.css'
import trashIcon from '../../assets/trash-solid.svg'
import { Todo } from '../../types/Todo';

type Props = {
    item: Todo,
    onDel: () => void,
    onChange: (id: number, done: boolean) => void;
}

export const ItemList = ({item, onDel, onChange}: Props) => {
    return (
        <div className='flex justify-between bg-[#eee] my-2 text-lg task-line'>
            <div className='flex items-center p-3'>
              <input 
                id={item.id.toString()}
                className='mr-4 checkbox'
                type='checkbox'
                onChange={e => onChange(item.id, e.target.checked)}
                checked={item.done}
              />
              <label className={item.done ? 'text-gray-500 line-through' : ''} htmlFor={item.id.toString()}>  {item.task} </label>
            </div>
            <button className='text-white bg-red-600 trashButton' onClick={onDel}> <img src={trashIcon} alt="trash" /> </button>
        </div>
    );
}