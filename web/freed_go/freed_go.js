
var FreedGoGame_Create = function() {
    var ans = Object.create( FreedGoPrototype_Game );
    ans.Setup();
    return ans;
}

var FreedGoPrototype_State = {
    Game : null,
    Core : {
        Turn : 0,
        Nodes : [],
    },

    Setup : function(game) {
        this.Game = game;
    },
};

var FreedGoThreeJS_Prototype = {
    Game : null,
    SceneParent : null,

    Setup : function(game) {
        this.Game = game;
    },

    Build : function( scene ) {
        this.SceneParent = scene;

        const geometry = new THREE.SphereBufferGeometry( 3.141, 12, 12 );
        const board_scale = 35.0;
        const piece_scale = 0.1;
        var lookTo = new THREE.Vector3();
        var referenceUp = new THREE.Vector3(0,0,1);

        var nodeInfo = this.Game.Board.Nodes;
        for (var ni=0; ni<nodeInfo.length; ni++) {
            var node = nodeInfo[ni];

            const stone = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
            stone.position.copy( node.Position );
            stone.position.multiplyScalar( board_scale );

            lookTo.copy( node.Normal );
            //lookTo.cross( referenceUp );
            lookTo.add( node.Position );
            lookTo.multiplyScalar( board_scale );
            stone.lookAt( lookTo );

            stone.scale.set( 1, 1, 0.3 );

            //stone.position.copy( node.Position );

            this.SceneParent.add( stone );
        }
    }
};

var FreedGoPrototype_Game = {
    Board : FreedGo_Boards_Mobius,
    State : FreedGoPrototype_State,
    Render : FreedGoThreeJS_Prototype,

    Setup : function() {
        this.Board = FreedGo_Boards_Mobius;
        this.State = Object.create( FreedGoPrototype_State );
        this.State.Setup( this );
        this.Render = Object.create( FreedGoThreeJS_Prototype );
        this.Render.Setup( this );
    },
};
