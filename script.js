let scene, camera, renderer, ring, diamonds = [],diamondHolders=[];
let controls; // Declare controls globally
let exrTexture;

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
const exrLoader = new THREE.EXRLoader();
exrLoader.load('j.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    scene.environment = texture; 
    exrTexture = texture;
});

function init() {
    // Scene setup
    scene = new THREE.Scene();
    const Tloader = new THREE.TextureLoader();
    Tloader.load('bg.jpeg', function (texture) {
    scene.background = texture;
    scene.backgroundIntensity = 4.0;
  });
    scene.background = new THREE.Color(0xffffff); // White background
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    camera.position.y = 2;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set the renderer size to match the #ring-container
    const ringContainer = document.getElementById('ring-container');
    renderer.setSize(ringContainer.clientWidth, ringContainer.clientHeight);
    ringContainer.appendChild(renderer.domElement);

    // Initialize OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true; 
    controls.autoRotateSpeed = 1; 
    // Ring setup
    createRingGeometry('squared',0xffd700);
    // const ringGeometry =  
    // const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.1 });
    // ring = new THREE.Mesh(ringGeometry, ringMaterial);
    // scene.add(ring);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 3); 
    // scene.add(ambientLight);

    // // Add multiple directional lights from different angles
    // const SpotLight1 = new THREE.SpotLight(0xffffff, 13);
    // SpotLight1.position.set(5, 2, 2);
    // scene.add(SpotLight1);

    // const SpotLight2 = new THREE.SpotLight(0xffffff, 13);
    // SpotLight2.position.set(-2, 2, 2);
    // scene.add(SpotLight2);

    // const SpotLight3 = new THREE.SpotLight(0xffffff, 13);
    // SpotLight3.position.set(2, 2, -2);
    // scene.add(SpotLight3);

    // const SpotLight4 = new THREE.SpotLight(0xffffff, 13);
    // SpotLight4.position.set(-2, 2, -2);
    // scene.add(SpotLight4);

    // const SpotLight5 = new THREE.SpotLight(0xffffff, 13);
    // SpotLight5.position.set(0, 2, 0);
    // scene.add(SpotLight5);

    // const SpotLight6 = new THREE.SpotLight(0xffffff, 13);
    // SpotLight6.position.set(0, -2, 0);
    // scene.add(SpotLight6);

    
    // const SpotLight7 = new THREE.SpotLight(0xffffff, 13);
    // SpotLight7.position.set(-2,-2, 0);
    // scene.add(SpotLight7);
    // const SpotLight8 = new THREE.SpotLight(0xffffff, 13);
    // SpotLight8.position.set(2,-2, 0);
    // scene.add(SpotLight8);

    
    // const SpotLight9 = new THREE.SpotLight(0xffffff, 10);
    // SpotLight9.position.set(0,0, 4);
    // scene.add(SpotLight9);
    // const SpotLight10 = new THREE.SpotLight(0xffffff, 10);
    // SpotLight10.position.set(0,0, -4);
    // scene.add(SpotLight10);

    // const rectLight = new THREE.RectAreaLight(0xffffff, 5, 100, 100); // (color, intensity, width, height)
    // rectLight.position.set(0, 0, -9); 
    // rectLight.lookAt(0, 0, 0); 
    // scene.add(rectLight);
    
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
    document.getElementById('stoneshape').addEventListener('change', updateRing);
    document.getElementById('pave_length').addEventListener('change', updateRing);

    // Add to Cart button click event
    addToCartButton.addEventListener('click', addToCart);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Initial price calculation
    updateRing();
}

function createRingGeometry(style, color,paveStyle,diamondCount,paveLength) {
    
    const loader = new THREE.GLTFLoader();
    let ringmodel=''
    if(style === 'square' && paveStyle==='none' && cathedral.value==='none' && (diamondCount==1 ||diamondCount==2||diamondCount==3)) {
        ringmodel='./new rings/squaredring.glb'
    }
    else if(style === 'square' &&paveStyle==='petite_french'&&diamondCount==1 && paveLength=='1/2'&& cathedral.value==='none') {
        ringmodel='./new rings/squared1_2frechpetitering.glb'
    }
    else if(style === 'square' &&paveStyle==='petite_french'&&diamondCount==2&& paveLength=='1/2'&& cathedral.value==='none') {
        ringmodel='./new rings/squared1_2frechpetite2stonering.glb'
    }
    else if(style === 'square' &&paveStyle==='petite_french'&&diamondCount==3&& paveLength=='1/2'&& cathedral.value==='none') {
        ringmodel='./new rings/squared1_2frechpetite3stonering.glb'
    }
    else if(style === 'square' &&paveStyle==='petite_french'&&diamondCount==3&& paveLength=='2/3'&& cathedral.value==='none') {
        ringmodel='./new rings/squared2_3frechpetite3stonering.glb'
    }
    
    else if(style === 'square' &&paveStyle==='petite_french'&&diamondCount==2&& paveLength=='2/3'&& cathedral.value==='none') {
        ringmodel='./new rings/squared2_3frechpetite2stonering.glb'
    }
    else if(style === 'square' &&paveStyle==='petite_french'&&diamondCount==1&& paveLength=='2/3'&& cathedral.value==='none') {
        ringmodel='./new rings/squared2_3frechpetite1stonering.glb'
    }
    else if(style === 'square' &&paveStyle==='petite_french'&&diamondCount==2&& paveLength=='full'&& cathedral.value==='none') {
        ringmodel='./new rings/squaredfullfrechpetite2stonering.glb'
    }
    else if(style === 'square' &&paveStyle==='petite_french'&&diamondCount==1&& paveLength=='full'&& cathedral.value==='none') {
        ringmodel='./new rings/squaredfullfrechpetite1stonering.glb'
    }
    else if(style === 'square' &&paveStyle==='petite_french'&&diamondCount==3&& paveLength=='full'&& cathedral.value==='none') {
        ringmodel='./new rings/squaredfullfrechpetite3stonering.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==3&& paveLength=='full'&& cathedral.value==='none') {
        ringmodel='./new rings/roundedfullfrechpetite3stonering.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==2&& paveLength=='full'&& cathedral.value==='none') {
        ringmodel='./new rings/roundedfullfrechpetite2stonering.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==1&& paveLength=='full'&& cathedral.value==='none') {
        ringmodel='./new rings/roundedfullfrechpetite1stonering.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==3&& paveLength=='2/3'&& cathedral.value==='none') {
        ringmodel='./new rings/rounded2_3frechpetite3stonering.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==2&& paveLength=='2/3'&& cathedral.value==='none') {
        ringmodel='./new rings/rounded2_3frechpetite2stonering.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==1&& paveLength=='2/3'&& cathedral.value==='none') {
        ringmodel='./new rings/rounded2_3frechpetite1stonering.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==3&& paveLength=='1/2'&& cathedral.value==='none') {
        ringmodel='./new rings/rounded1_2frechpetite3stonering.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==2&& paveLength=='1/2'&& cathedral.value==='none') {
        ringmodel='./new rings/rounded1_2frechpetite1stonering.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==1&& paveLength=='1/2'&& cathedral.value==='none') {
        ringmodel='./new rings/rounded1_2frechpetite1stonering.glb'
    }
    
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==1&& paveLength=='1/2'&& cathedral.value==='cathedral') {
        ringmodel='./new rings/round1prog 1_2frenchpetitcath.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==1&& paveLength=='2/3'&& cathedral.value==='cathedral') {
        ringmodel='./new rings/round1prog 2_3frenchpetitcath.glb'
    }
    else if(style === 'round' &&paveStyle==='petite_french'&&diamondCount==1&& paveLength=='full'&& cathedral.value==='cathedral') {
        ringmodel='./new rings/round1prog fullfrenchpetitcath.glb'
    }
    else if(style === 'round' && paveStyle==='none'&& cathedral.value==='cathedral'&&diamondCount==1) {
        ringmodel='./new rings/roundcath.glb'
    }
    else{
        ringmodel='./new rings/roundring.glb'

    }
    loader.load(ringmodel, function (gltf) {
        if(style === 'round' && paveStyle==='none'&& cathedral.value==='cathedral') {
            gltf.scene.scale.set(0.23,0.23,0.23)
    
        }
        else if(style === 'round'&&paveStyle==='none') {
        gltf.scene.scale.set(0.0185,0.0185,0.0185)
        }
        else if(style === 'square'&&paveStyle==='none') {
            gltf.scene.scale.set(3.5,3.5,3.5)
        }
        
        else if(style === 'square' && paveStyle==='petite_french') {
            gltf.scene.scale.set(3.5,3.5,3.5)
        }
                    if (ring)scene.remove(ring)
                        const textureLoader = new THREE.TextureLoader();
                    const texture = textureLoader.load('dtext.jpg')

                        gltf.scene.traverse((child) => {
                            if (child.isMesh && !child.name.startsWith('Round')) {
                                child.material = new THREE.MeshStandardMaterial({
                                    color: color,
                                    // map:ringtexture,
                                    metalness: 5,
                                    roughness: 0.1, 
                                    flatShading: false,
                                    emissive : color,
                                    emissiveIntensity : 0.2
                                    
                                });
                            }
                            if(child.isMesh && child.name.startsWith('Round')){
                                child.material = new THREE.MeshStandardMaterial({
                                    map: texture,
                                    metalness: 0.5,
                                    roughness: 0.5, 
                                    flatShading: false
                                });
                            }
                            
                        });
                    
                    gltf.scene.environment = exrTexture;
                    ring=gltf.scene
        scene.add(ring)

    })
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
    const stoneshape = document.getElementById('stoneshape').value;
    const paveLength = document.getElementById('pave_length').value;

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
    }; const diamondCount = {
        'one_stone_solitaire': 1,
        'one_stone': 1,
        'two_stone': 2,
        'three_stone': 3
    }[centerStone];

    // ring.material.color.set();
    createRingGeometry(bandStyle,metalColors[metal],paveStyle,diamondCount,paveLength);
    // Update ring geometry based on band style
    // ring.geometry.dispose(); // Dispose of the old geometry
    // ring.geometry = 
    // if (bandStyle === 'square') {
    //     ring.position.z = -0.1; // Adjust the ring position for square style
    // } else {
    //     ring.position.z = 0; // Adjust the ring position for round
    // }

    // Update diamonds based on center stone selection
    const loader = new THREE.GLTFLoader();
    const textureLoader = new THREE.TextureLoader(); // Add texture loader

    diamonds.forEach(diamond => scene.remove(diamond));
    diamondHolders.forEach(diamond => scene.remove(diamond));
    diamonds = [];

   
    const diamondSpacing = 0.5; // Space between diamonds
    const ringRadius = 0.8; // Radius of the ring
    const diamondBaseHeight = 1.15; // Base height for the diamonds

    for (let i = 0; i < diamondCount; i++) {
        const x = (i - (diamondCount - 1) / 2) * diamondSpacing; // Position diamonds side by side
        const y = diamondBaseHeight; // Height of the diamonds
        const z = 0; // Diamonds are on top of the ring

        let diamondModel = '';
        if (stoneshape === 'princess') {
            diamondModel = './diamonds/princess.glb';
        }
        else if (stoneshape === 'oval') {
            diamondModel = './diamonds/oval.glb';
        }
        else if (stoneshape === 'round') {
            diamondModel = './diamonds/round.glb';
        }
        else if (stoneshape === 'emerald') {
            diamondModel = './diamonds/emeraled.glb';
        }
        else if (stoneshape === 'pear') {
            diamondModel = './diamonds/pear.glb';
        }
        else if (stoneshape === 'marquise') {
            diamondModel = './diamonds/marquise.glb';
        }
        else if (stoneshape === 'ascher') {
            diamondModel = './diamonds/ascher.glb';
        }
        else if (stoneshape === 'radient') {
            diamondModel = './diamonds/radient.glb';
        }
        else if (stoneshape === 'cushion') {
            diamondModel = './diamonds/cushion.glb';
        }

        loader.load(diamondModel, function (gltf) {
                gltf.scene.scale.set(0.4, 0.4, 0.4);
            if (stoneshape === 'round') {
                gltf.scene.scale.set(0.57, 0.38, 0.57);
            } else if (stoneshape === 'oval') {
                gltf.scene.scale.set(0.4, 0.38, 0.3);
            }
            else if (stoneshape === 'princess') {
                gltf.scene.scale.set(0.34, 0.3, 0.34);
            }
            
            else if (stoneshape === 'ascher') {
                gltf.scene.scale.set(0.4, 0.3, 0.4);
            }
            else if (stoneshape === 'emerald') {
                gltf.scene.scale.set(0.4, 0.26, 0.3);
            }
            else if (stoneshape === 'cushion') {
                gltf.scene.scale.set(0.35, 0.2, 0.35);
            }
            else if (stoneshape === 'radient') {
                gltf.scene.scale.set(0.35, 0.2, 0.35);
            }
            else if (stoneshape === 'pear') {
                gltf.scene.scale.set(0.35, 0.2, 0.35);
            }

            

            if (diamondCount === 1) {
                gltf.scene.position.set(x, y, z);
            } else if (diamondCount === 2) {
                const angle = Math.atan2(x, ringRadius);
                if(i==0){
                gltf.scene.position.set(x-0.027, y - 0.1, z);
                    gltf.scene.rotation.z=-angle;
                }
                else{
                    gltf.scene.position.set(x+0.1, y - 0.1, z);
                    gltf.scene.rotation.z=-angle;
                }
            } else if (diamondCount === 3) {
                if (i === 0) {
                    gltf.scene.position.set(x - 0.05, y - 0.2, z);
                    const angle = Math.atan2(x, ringRadius);
                    gltf.scene.rotation.z = -angle;
                } else if (i === 1) {
                    gltf.scene.position.set(x, y, z);
                } else if (i === 2) {
                    gltf.scene.position.set(x + 0.05, y - 0.2, z);
                    const angle = Math.atan2(x, ringRadius);
                    gltf.scene.rotation.z = -angle;
                }
            }


            // Load and apply texture to the diamond model
            const diamondTexture = textureLoader.load('dtext.jpg');
            // diamondTexture.wrapS = THREE.RepeatWrapping; 
            // diamondTexture.wrapT = THREE.RepeatWrapping;
            diamondTexture.repeat.set(5,5);
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    // Scale the UVs to make the texture repeat
                    const uvAttribute = child.geometry.attributes.uv;
                    for (let i = 0; i < uvAttribute.array.length; i++) {
                        uvAttribute.array[i] *= 1; // Scale UVs by a factor of 5
                    }
                    uvAttribute.needsUpdate = true; // Ensure the changes are applied
            
                    child.material = new THREE.MeshStandardMaterial({
                        map: diamondTexture,
                        transparent: true,
                        opacity: 0.9,
                        side: THREE.DoubleSide,
                        metalness: 0.5,
                        roughness: 0.5
                        
                    });
                }
            });
            diamonds.push(gltf.scene);
            scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });

        let progmodel = '';
        if (prongCount == 6 && prongTips == 'rounded') {
            progmodel = './prongs/6progringholder.glb';
        } else if (prongCount == 6 && prongTips == 'claw') {
            progmodel = './prongs/6progpointy.glb';
}

            else if (prongCount==6 && prongTips=='tab'){
                progmodel='./prongs/6progtab.glb'
            }
            else if (prongCount==4&&prongTips=='tab'){
                progmodel='./prongs/4progtab.glb'
            }
         else if (prongCount == 4 && prongTips == 'claw') {
            progmodel = './prongs/4progpointy.glb';
        } else {
            progmodel = './prongs/ringholder.glb';
        }
        

        loader.load(progmodel, function (gltf) {
                gltf.scene.scale.set(80, 50, 80);
                if (stoneshape === 'marquise'|| stoneshape === 'pear') {
                    gltf.scene.rotation.y=43;
                }

            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: metalColors[metal],
                        metalness: 1,
                        roughness: 0.1,
                    });

                    if (child.name === 'ringcircle' && basketHalo === 'none') {
                        child.scale.set(0.8, 2, 0.8);
                    } else if (child.name === 'ringcircle' && basketHalo === 'basket') {
                        // No changes
                    } else if (child.name === 'ringcircle' && basketHalo === 'halo') {
                        child.position.set(0, 0.6, 0);
                    } else if (child.name === 'ringcircle' && basketHalo === 'bezel') {
                        child.scale.set(1.1, 1.1, 1.1);
                    } else if (child.name === 'ringcircle' && basketHalo === 'hidden_halo') {
                        child.scale.set(1.1, 1.1, 1.1);
                    }

                    child.material.needsUpdate = true;
                }
            });

            if (diamondCount === 1) {
                gltf.scene.position.set(x, y - 0.1, z);
            } else if (diamondCount === 2) {
                const angle = Math.atan2(x, ringRadius);
                if(i==0){
                gltf.scene.position.set(x, y - 0.16, z);
                    gltf.scene.rotation.z=-angle;
                }
                else{
                    gltf.scene.position.set(x+0.07, y - 0.16, z);
                    gltf.scene.rotation.z=-angle;
                }
            } else if (diamondCount === 3) {
                if (i === 0) {
                    gltf.scene.position.set(x - 0.03, y - 0.27, z);
                    const angle = Math.atan2(x, ringRadius);
                    gltf.scene.rotation.z = -angle;
                } else if (i === 1) {
                    gltf.scene.position.set(x, y - 0.1, z);
                } else if (i === 2) {
                    gltf.scene.position.set(x + 0.03, y - 0.27, z);
                    const angle = Math.atan2(x, ringRadius);
                    gltf.scene.rotation.z = -angle;
                }
            }

            diamondHolders.push(gltf.scene);
            scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
    }

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
    controls.update(); 
    renderer.render(scene, camera);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 4; 
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        const content = section.querySelector('.section-content');
        const arrow = header.querySelector('.arrow');

        header.addEventListener('click', () => {
            content.classList.toggle('open');
            arrow.textContent = content.classList.contains('open') ? '▲' : '▼';
        });
    });
});