let scene, camera, renderer, ring;

// Base prices for customization options
const prices = {
    metal: {
        '14k_yellow_gold': 500,
        '14k_white': 500,
        '14k_yellow': 500,
        '14k_rose': 500,
        '18k_white': 700,
        '18k_yellow': 700,
        '18k_rose': 700,
        'platinum': 1000,
        'mixed': 800
    },
    center_stone: {
        'one_stone_solitaire': 1000,
        'one_stone': 1000,
        'two_stone': 1500,
        'three_stone': 2000
    },
    diamond_type: {
        'natural': 1000,
        'lab_grown': 500,
        'skip': 0
    },
    basket_halo: {
        'none': 0,
        'basket': 200,
        'halo': 300,
        'bezel': 250,
        'hidden_halo': 350
    },
    prong_count: {
        '4_classic': 100,
        '4_compass': 150
    },
    prong_tips: {
        'rounded': 50,
        'claw': 75,
        'petite_claw': 100,
        'tab': 60
    },
    prong_pave: {
        'none': 0,
        'pave': 200
    },
    band_style: {
        'round': 0,
        'square': 100
    },
    cathedral: {
        'none': 0,
        'cathedral': 150
    },
    pave_style: {
        'none': 0,
        'petite_french': 200
    },
    band_width: {
        '1.7': 0,
        '1.54': 0
    },
    engraving: {
        'none': 0,
        'block': 100,
        'cursive': 120,
        'surprise_stones': 150
    }
};

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // White background
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set the renderer size to match the #ring-container
    const ringContainer = document.getElementById('ring-container');
    renderer.setSize(ringContainer.clientWidth, ringContainer.clientHeight);
    ringContainer.appendChild(renderer.domElement);


    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Ring setup
    const ringGeometry = new THREE.TorusGeometry(0.8, 0.1, 16, 100, Math.PI * 2);
    const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.7, roughness: 0.3 });
    ring = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(ring);

    //adding diamond

    const loader = new THREE.GLTFLoader();

        loader.load('scene.gltf', function (gltf) {
            gltf.scene.scale.set(0.0004, 0.0004, 0.0004);
            gltf.scene.position.set(0, 1.15, 0);
            scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });


    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Price display
    const priceDisplay = document.createElement('div');
    priceDisplay.style.position = 'absolute';
    priceDisplay.style.top = '20px';
    priceDisplay.style.right = '20px';
    priceDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    priceDisplay.style.color = 'white';
    priceDisplay.style.padding = '10px';
    priceDisplay.style.borderRadius = '5px';
    priceDisplay.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(priceDisplay);

    // Add to Cart button
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.style.position = 'absolute';
    addToCartButton.style.bottom = '20px';
    addToCartButton.style.right = '20px';
    addToCartButton.style.padding = '10px 20px';
    addToCartButton.style.backgroundColor = '#0073aa';
    addToCartButton.style.color = 'white';
    addToCartButton.style.border = 'none';
    addToCartButton.style.borderRadius = '5px';
    addToCartButton.style.cursor = 'pointer';
    document.body.appendChild(addToCartButton);

    // Event listeners for dropdown changes
    document.getElementById('metal').addEventListener('change', updateRing);
    document.getElementById('center_stone').addEventListener('change', updateRing);
    document.getElementById('diamond_type').addEventListener('change', updateRing);
    document.getElementById('basket_halo').addEventListener('change', updateRing);
    document.getElementById('prong_count').addEventListener('change', updateRing);
    document.getElementById('prong_tips').addEventListener('change', updateRing);
    document.getElementById('prong_pave').addEventListener('change', updateRing);
    document.getElementById('band_style').addEventListener('change', updateRing);
    document.getElementById('cathedral').addEventListener('change', updateRing);
    document.getElementById('pave_style').addEventListener('change', updateRing);
    document.getElementById('band_width').addEventListener('change', updateRing);
    document.getElementById('engraving').addEventListener('change', updateRing);

    // Add to Cart button click event
    addToCartButton.addEventListener('click', addToCart);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Initial price calculation
    updateRing();
}

function updateRing() {
    const metal = document.getElementById('metal').value;
    const centerStone = document.getElementById('center_stone').value;
    const diamondType = document.getElementById('diamond_type').value;
    const basketHalo = document.getElementById('basket_halo').value;
    const prongCount = document.getElementById('prong_count').value;
    const prongTips = document.getElementById('prong_tips').value;
    const prongPave = document.getElementById('prong_pave').value;
    const bandStyle = document.getElementById('band_style').value;
    const cathedral = document.getElementById('cathedral').value;
    const paveStyle = document.getElementById('pave_style').value;
    const bandWidth = document.getElementById('band_width').value;
    const engraving = document.getElementById('engraving').value;

    // Update ring material based on metal selection
    const metalColors = {
        '14k_yellow_gold': 0xffd700,
        '14k_white': 0xffffff,
        '14k_yellow': 0xffd700,
        '14k_rose': 0xff69b4,
        '18k_white': 0xffffff,
        '18k_yellow': 0xffd700,
        '18k_rose': 0xff69b4,
        'platinum': 0xe5e4e2,
        'mixed': 0xcccccc
    };
    ring.material.color.set(metalColors[metal]);

    // Calculate total price
    const totalPrice =
        prices.metal[metal] +
        prices.center_stone[centerStone] +
        prices.diamond_type[diamondType] +
        prices.basket_halo[basketHalo] +
        prices.prong_count[prongCount] +
        prices.prong_tips[prongTips] +
        prices.prong_pave[prongPave] +
        prices.band_style[bandStyle] +
        prices.cathedral[cathedral] +
        prices.pave_style[paveStyle] +
        prices.engraving[engraving];

    // Update price display
    document.querySelector('#price').textContent = `Total Price: $${totalPrice}`;
}

function addToCart() {
    const totalPrice = parseFloat(document.querySelector('div').textContent.replace('Total Price: $', ''));
    const productId = 123; // Replace with your WooCommerce product ID

    // Redirect to WooCommerce add-to-cart URL with custom price
    window.location.href = `/?add-to-cart=${productId}&quantity=1&custom_price=${totalPrice}`;
}

function onWindowResize() {
    // Update camera aspect ratio and renderer size based on the #ring-container
    const ringContainer = document.getElementById('ring-container');
    camera.aspect = ringContainer.clientWidth / ringContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(ringContainer.clientWidth, ringContainer.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    ring.rotation.y += 0.005; // Slow horizontal rotation
    renderer.render(scene, camera);
}