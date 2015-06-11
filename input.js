var moveVector = new Vector3(10, 10, -45);
var rotationVector = new Vector3(0, 0, 0);
var speed = 2;
$(window).keydown(function (event) {
    switch (event.keyCode) {
        case 37: // Left
            moveVector.X += -1 * speed;
            break;

        case 38: // Forward
            moveVector.Z += -1 * speed;
            break;

        case 39: // Right
            moveVector.X += 1 * speed;
            break;

        case 40: // Back
            moveVector.Z += 1 * speed;
            break;
        case 32: // Up
            moveVector.Y += 1 * speed;
            break;
        case 16: // Down
            moveVector.Y += -1 * speed;
            break;
            
        case 87:
            rotationVector.X += -1;
            break;
        case 83:
            rotationVector.X += 1;
            break;
        case 65:
            rotationVector.Y += -1;
            break;
        case 68:
            rotationVector.Y += 1;
            break;
    }
});