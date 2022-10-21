import { useEffect, useState } from 'react';
import { ItemList } from './components/ItemList';
import { useTodoList } from './hooks/todoList';
import './tailwind.css';

const App = () => {
  const [taskField, setTaskField] = useState('');
  const [todoList, dispatch] = useTodoList();

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todoList));
  }, [todoList])

  const handleAddTask = () => {
    if (taskField) {
      dispatch({
        type: 'ADD',
        payload: {
          task: taskField
        }
      })
      setTaskField('')
    }
  }

  const handleTaskChange = (id: number, done: boolean) => {
    dispatch({
      type: 'DONE',
      payload: {
        id: id,
        done: done
      }
    })
  }
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='max-w-[600px] w-full bg-white h-[600px] rounded-lg p-5 flex flex-col'>
        <header>
          <fieldset className='border-2 p-3'>
            <legend><h1 className='text-2xl font-bold'>Lista de Tarefas</h1></legend>
            <div className='h-[35px] flex justify-between'>
              <input value={taskField} onKeyUp={(e) => e.key === 'Enter' ? handleAddTask() : ''} onChange={(e) => setTaskField(e.target.value)} className='p-2 border-2 text-xl w-11/12 hover:border-purple-600 focus:border-purple-600 outline-none' type='text' placeholder='Adicione uma tarefa' />
              <button disabled={taskField ? false : true} onClick={handleAddTask} className='bg-purple-600 text-2xl text-white w-[35px] h-[35px] disabled:opacity-70 rounded-sm'>+</button>
            </div>
          </fieldset>
        </header>
        <div className='flex flex-col mt-8 h-4/5 overflow-auto'>
          {todoList.map((item, key) => (
            <ItemList
              key={key}
              item={item}
              onDel={() => dispatch({ type: 'DEL', payload: { id: item.id } })}
              onChange={handleTaskChange}
            />
          ))}
        </div>
        <div className='flex justify-between items-center mt-4'>
          <p>Você tem {todoList.reduce((acc, item) => !item.done ? acc += 1 : acc, 0)} tarefas pendentes.</p>
          <button onClick={() => dispatch({ type: 'CLEAR' })} className='bg-purple-600 px-2 py-1 text-white'>Clear All</button>
        </div>
        <p className='text-center text-gray-500'>Desenvolvido por <a className='underline text-blue-500' target='_blank' href="https://github.com/rafaelc10">Rafael Coppini</a></p>
      </div>
    </div>
  );
}
export default App;