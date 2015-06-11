
var Color = function(R, G, B, A) {
    this.R = R;
    this.G = G;
    this.B = B;
    this.A = A;
};
var Vector2 = function(X, Y) {
    this.X = X;
    this.Y = Y;
};
var Vector3 = function(X, Y, Z) {
    this.X = X;
    this.Y = Y;
    this.Z = Z;
    this.isEmpty = function() {
        if (this.X == 0 && this.Y == 0 && this.Z == 0)
            return true;
        else
            return false;
    },
    this.Zero = function() {
            this.X = 0;
            this.Y = 0;
            this.Z = 0;
        }
};
var Utils = {
    Radians: function(degrees) {
        return degrees * (Math.PI / 180.0);
    }
};

var Matrix = {
    CreateProjection: function(fov, aspect, near, far) {
        fov = near * Math.tan(fov * Math.PI / 360);
        aspect = fov * aspect;
        return Matrix.CreateFrustum(-aspect, aspect, -fov, fov, near, far);
    },
    CreateFrustum: function(left, right, bottom, top, near, far) {
        var h = right - left,
            i = top - bottom,
            j = far - near;
        var matrix = Matrix.identity();
        matrix[0] = near * 2 / h;
        matrix[1] = 0;
        matrix[2] = 0;
        matrix[3] = 0;
        matrix[4] = 0;
        matrix[5] = near * 2 / i;
        matrix[6] = 0;
        matrix[7] = 0;
        matrix[8] = (right + left) / h;
        matrix[9] = (top + bottom) / i;
        matrix[10] = -(far + near) / j;
        matrix[11] = -1;
        matrix[12] = 0;
        matrix[13] = 0;
        matrix[14] = -(far * near * 2) / j;
        matrix[15] = 0;
        return matrix;
    },
    identity: function() {
        var matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        return matrix;
    },
    Rotation: function(vector) {
        var mat = Matrix.identity();
        if(vector.X!=0){
            mat=Matrix.Multiply(mat, Matrix.RotationX(vector.X));
        }
        if(vector.Y!=0){
            mat=Matrix.Multiply(mat, Matrix.RotationY(vector.Y));
        }
        if(vector.Z!=0){
            mat=Matrix.Multiply(mat, Matrix.RotationZ(vector.Z));
        }
        return mat;
    },
    Translate: function(vector) {
        var matrix = [
            1, 0, 0, vector.X,
            0, 1, 0, vector.Y,
            0, 0, 1, vector.Z,
            0, 0, 0, 1
        ];
        return matrix;
    },
    RotationX: function(a) {
        a = Utils.Radians(a);
        var matrix = [
            1, 0, 0, 0,
            0, Math.cos(a), Math.sin(a), 0,
            0, -Math.sin(a), Math.cos(a), 0,
            0, 0, 0, 1
        ];
        return matrix;
    },
    RotationY: function(a) {
        a = Utils.Radians(a);
        var matrix = [
            Math.cos(a), 0, -Math.sin(a), 0,
            0, 1, 0, 0,
            Math.sin(a), 0, Math.cos(a), 0,
            0, 0, 0, 1
        ];
        return matrix;
    },
    RotationZ: function(a) {
        a = Utils.Radians(a);
        var matrix = [
            Math.cos(a), -Math.sin(a), 0, 0,
            -Math.sin(a), 0, Math.cos(a), 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        return matrix;
    },
    Scale: function(scale) {
        var matrix = [scale.X, 0, 0, 0,
            0, scale.Y, 0, 0,
            0, 0, scale.Z, 0,
            0, 0, 0, 1
        ];
        return matrix;
    },
    Transform: function(m, v) {

        var X = m[0] * v.X + m[1] * v.Y + m[2] * v.Z + m[3] * 1;
        var Y = m[4] * v.X + m[5] * v.Y + m[6] * v.Z + m[7] * 1;
        var Z = m[8] * v.X + m[9] * v.Y + m[10] * v.Z + m[11] * 1;
        var W = m[12] * v.X + m[13] * v.Y + m[14] * v.Z + m[15] * 1;
        return new Vector3(X/W,Y/W,Z/W);
    },
    Multiply: function(m1, m2) {
        var matrix = Matrix.identity();
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                matrix[4 * x + y] = 0;
                for (var z = 0; z < 4; z++) {
                    matrix[4 * x + y] += m1[4 * x + z] * m2[4 * z + y];
                }
            }
        }
        return matrix;
    },
    ToScreen: function(vector, width, height) {
        return new Vector2(vector.X / vector.Z * width, vector.Y / vector.Z * height);
    }
};