Rails.application.routes.draw do

  root 'sudoku#sudoku_board'
  get 'documentation' => 'sudoku#documentation'

end
