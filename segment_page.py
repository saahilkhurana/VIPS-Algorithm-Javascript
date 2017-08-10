def horizontal_segmentation(rects):
    rects.sort(key=lambda x: x[1])
    n_rects = len(rects)
    horizontal_lines = [rects[0][1]]
    for i in xrange(1, n_rects):
        if rects[i][1] > rects[i-1][3]:
            horizontal_lines.append(rects[i-1][3])
            horizontal_lines.append(rects[i][1])
        elif rects[i][1] == rects[i-1][3]:
            horizontal_lines.append(rects[i-1][3])

    if horizontal_lines[len(horizontal_lines)-1] != rects[n_rects-1][3]:
        horizontal_lines.append(rects[n_rects-1][3])
    return horizontal_lines


def vertical_segmentation(rects):
    rects.sort(key=lambda x: x[0])
    n_rects = len(rects)
    vertical_lines = [rects[0][0]]
    for i in xrange(1, n_rects):
        if rects[i][0] > rects[i-1][2]:
            vertical_lines.append(rects[i-1][2])
            vertical_lines.append(rects[i][0])
        elif rects[i][0] == rects[i-1][2]:
            vertical_lines.append(rects[i-1][2])

    if vertical_lines[len(vertical_lines)-1] != rects[n_rects-1][2]:
        vertical_lines.append(rects[n_rects-1][2])
    return vertical_lines


if __name__ == "__main__":
    rects = [[2, 3, 4, 5], [6, 9, 9, 11], [3, 7, 5, 9], [6, 4, 8, 6]]
    print(horizontal_segmentation(rects))
    print(vertical_segmentation(rects))