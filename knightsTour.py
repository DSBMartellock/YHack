# -----------------------------------------------------------------------------|
def solveTour(starting_position):
    """

    """
    positions = set([(x, y) for x in range(8) for y in range(8)])
    positions.remove(starting_position)
    solution_list = [starting_position]
    _solveTour(positions, starting_position, solution_list)
    return solution_list
# -----------------------------------------------------------------------------|


# -----------------------------------------------------------------------------|
def _solveTour(positions, starting_position, solution_list):
    """

    """
    if len(solution_list) == 64:
        return solution_list

    valid_positions = get_valid_positions(positions, starting_position)

    for position in valid_positions:
        positions.remove(position)
        solution_list.append(position)

        if _solveTour(positions, position, solution_list):
            return

        solution_list.pop()
        positions.add(position)

# -----------------------------------------------------------------------------|


# -----------------------------------------------------------------------------|
def get_valid_positions(positions, starting_position):
    """

    """
    relative_moves = [
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2],
        [2, -1],
        [2, 1],
        [-2, 1],
        [-2, -1]
    ]

    valid_positions = []
    for move in relative_moves:
        probable_move = (starting_position[0] + move[0],
                                        starting_position[1] + move[1])

        if probable_move in positions:
            valid_positions.append(probable_move)

    return valid_positions
# -----------------------------------------------------------------------------|


# -----------------------------------------------------------------------------|
def main():
    """

    """
    print(solveTour((0, 0)))
# -----------------------------------------------------------------------------|


if __name__ == '__main__':
    main()
