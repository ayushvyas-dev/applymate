'use client';
import BoardColumn from './board-column';

export default function JobBoard() {
  return (
    <div className='flex flex-col sm:flex-row items-start sm:overflow-x-auto pb-4'>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
    </div>
  );
}
