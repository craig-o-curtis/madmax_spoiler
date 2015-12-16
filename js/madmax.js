/* madmax js */

 /**
 * @author mousman
 */
 
(function(){
  
     
 //**********************************************************************************************/
 // FastSimplexNoise by Stefan Gustavson
 //**********************************************************************************************/     
function FastSimplexNoise(a){
 /*
 * A speed-improved simplex noise algorithm for 2D, 3D and 4D in JavaScript.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 */
if(a||(a={}),this.amplitude=a.amplitude||1,this.frequency=a.frequency||1,this.octaves=parseInt(a.octaves||1),this.persistence=a.persistence||.5,this.random=a.random||Math.random,"number"==typeof a.min&&"number"==typeof a.max)if(a.min>=a.max)console.error("options.min must be less than options.max");else{var b=parseFloat(a.min),c=parseFloat(a.max),d=c-b;this.scale=function(a){return b+(a+1)/2*d}}var e,f=new Uint8Array(256);for(e=0;256>e;e++)f[e]=e;var g,h;for(e=255;e>0;e--)g=Math.floor((e+1)*this.random()),h=f[e],f[e]=f[g],f[g]=h;for(this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512),e=0;512>e;e++)this.perm[e]=f[255&e],this.permMod12[e]=this.perm[e]%12}FastSimplexNoise.G2=(3-Math.sqrt(3))/6,FastSimplexNoise.G3=1/6,FastSimplexNoise.G4=(5-Math.sqrt(5))/20,FastSimplexNoise.GRADIENTS_3D=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,-1],[0,1,-1],[0,-1,-1]],FastSimplexNoise.GRADIENTS_4D=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],FastSimplexNoise.dot2D=function(a,b,c){return a[0]*b+a[1]*c},FastSimplexNoise.dot3D=function(a,b,c,d){return a[0]*b+a[1]*c+a[2]*d},FastSimplexNoise.dot4D=function(a,b,c,d,e){return a[0]*b+a[1]*c+a[2]*d+a[3]*e},FastSimplexNoise.prototype.get2DNoise=function(a,b){for(var c=this.amplitude,d=this.frequency,e=0,f=0,g=this.persistence,h=0;h<this.octaves;h++)f+=this.getRaw2DNoise(a*d,b*d)*c,e+=c,c*=g,d*=2;var i=f/e;return this.scale?this.scale(i):i},FastSimplexNoise.prototype.get3DNoise=function(a,b,c){for(var d=this.amplitude,e=this.frequency,f=0,g=0,h=this.persistence,i=0;i<this.octaves;i++)g+=this.getRaw3DNoise(a*e,b*e,c*e)*d,f+=d,d*=h,e*=2;var j=g/f;return this.scale?this.scale(j):j},FastSimplexNoise.prototype.get4DNoise=function(a,b,c,d){for(var e=this.amplitude,f=this.frequency,g=0,h=0,i=this.persistence,j=0;j<this.octaves;j++)h+=this.getRaw4DNoise(a*f,b*f,c*f,d*f)*e,g+=e,e*=i,f*=2;var k=h/g;return this.scale?this.scale(k):k},FastSimplexNoise.prototype.getCylindrical2DNoise=function(a,b,c){var d=b/a,e=a/(2*Math.PI),f=2*d*Math.PI,g=e*Math.sin(f),h=e*Math.cos(f);return this.get3DNoise(g,h,c)},FastSimplexNoise.prototype.getCylindrical3DNoise=function(a,b,c,d){var e=b/a,f=a/(2*Math.PI),g=2*e*Math.PI,h=f*Math.sin(g),i=f*Math.cos(g);return this.get4DNoise(h,i,c,d)},FastSimplexNoise.prototype.getRaw2DNoise=function(a,b){var c,d,e,f,g,h=FastSimplexNoise.G2,i=FastSimplexNoise.dot2D,j=FastSimplexNoise.GRADIENTS_3D,k=this.perm,l=this.permMod12,m=.5*(a+b)*(Math.sqrt(3)-1),n=Math.floor(a+m),o=Math.floor(b+m),p=(n+o)*h,q=n-p,r=o-p,s=a-q,t=b-r;s>t?(f=1,g=0):(f=0,g=1);var u=s-f+h,v=t-g+h,w=s-1+2*h,x=t-1+2*h,y=255&n,z=255&o,A=l[y+k[z]],B=l[y+f+k[z+g]],C=l[y+1+k[z+1]],D=.5-s*s-t*t;0>D?c=0:(D*=D,c=D*D*i(j[A],s,t));var E=.5-u*u-v*v;0>E?d=0:(E*=E,d=E*E*i(j[B],u,v));var F=.5-w*w-x*x;return 0>F?e=0:(F*=F,e=F*F*i(j[C],w,x)),70.14805770653952*(c+d+e)},FastSimplexNoise.prototype.getRaw3DNoise=function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n=FastSimplexNoise.dot3D,o=FastSimplexNoise.GRADIENTS_3D,p=FastSimplexNoise.G3,q=this.perm,r=this.permMod12,s=(a+b+c)/3,t=Math.floor(a+s),u=Math.floor(b+s),v=Math.floor(c+s),w=(t+u+v)*p,x=t-w,y=u-w,z=v-w,A=a-x,B=b-y,C=c-z;A>=B?B>=C?(h=1,i=0,j=0,k=1,l=1,m=0):A>=C?(h=1,i=0,j=0,k=1,l=0,m=1):(h=0,i=0,j=1,k=1,l=0,m=1):C>B?(h=0,i=0,j=1,k=0,l=1,m=1):C>A?(h=0,i=1,j=0,k=0,l=1,m=1):(h=0,i=1,j=0,k=1,l=1,m=0);var D=A-h+p,E=B-i+p,F=C-j+p,G=A-k+2*p,H=B-l+2*p,I=C-m+2*p,J=A-1+3*p,K=B-1+3*p,L=C-1+3*p,M=255&t,N=255&u,O=255&v,P=r[M+q[N+q[O]]],Q=r[M+h+q[N+i+q[O+j]]],R=r[M+k+q[N+l+q[O+m]]],S=r[M+1+q[N+1+q[O+1]]],T=.5-A*A-B*B-C*C;0>T?d=0:(T*=T,d=T*T*n(o[P],A,B,C));var U=.5-D*D-E*E-F*F;0>U?e=0:(U*=U,e=U*U*n(o[Q],D,E,F));var V=.5-G*G-H*H-I*I;0>V?f=0:(V*=V,f=V*V*n(o[R],G,H,I));var W=.5-J*J-K*K-L*L;return 0>W?g=0:(W*=W,g=W*W*n(o[S],J,K,L)),94.68493150681971*(d+e+f+g)},FastSimplexNoise.prototype.getRaw4DNoise=function(a,b,c,d){var e,f,g,h,i,j=FastSimplexNoise.dot4D,k=FastSimplexNoise.GRADIENTS_4D,l=FastSimplexNoise.G4,m=this.perm,n=(this.permMod12,(a+b+c+d)*(Math.sqrt(5)-1)/4),o=Math.floor(a+n),p=Math.floor(b+n),q=Math.floor(c+n),r=Math.floor(d+n),s=(o+p+q+r)*l,t=o-s,u=p-s,v=q-s,w=r-s,x=a-t,y=b-u,z=c-v,A=d-w,B=0,C=0,D=0,E=0;x>y?B++:C++,x>z?B++:D++,x>A?B++:E++,y>z?C++:D++,y>A?C++:E++,z>A?D++:E++;var F,G,H,I,J,K,L,M,N,O,P,Q;F=B>=3?1:0,G=C>=3?1:0,H=D>=3?1:0,I=E>=3?1:0,J=B>=2?1:0,K=C>=2?1:0,L=D>=2?1:0,M=E>=2?1:0,N=B>=1?1:0,O=C>=1?1:0,P=D>=1?1:0,Q=E>=1?1:0;var R=x-F+l,S=y-G+l,T=z-H+l,U=A-I+l,V=x-J+2*l,W=y-K+2*l,X=z-L+2*l,Y=A-M+2*l,Z=x-N+3*l,$=y-O+3*l,_=z-P+3*l,aa=A-Q+3*l,ba=x-1+4*l,ca=y-1+4*l,da=z-1+4*l,ea=A-1+4*l,fa=255&o,ga=255&p,ha=255&q,ia=255&r,ja=m[fa+m[ga+m[ha+m[ia]]]]%32,ka=m[fa+F+m[ga+G+m[ha+H+m[ia+I]]]]%32,la=m[fa+J+m[ga+K+m[ha+L+m[ia+M]]]]%32,ma=m[fa+N+m[ga+O+m[ha+P+m[ia+Q]]]]%32,na=m[fa+1+m[ga+1+m[ha+1+m[ia+1]]]]%32,oa=.5-x*x-y*y-z*z-A*A;0>oa?e=0:(oa*=oa,e=oa*oa*j(k[ja],x,y,z,A));var pa=.5-R*R-S*S-T*T-U*U;0>pa?f=0:(pa*=pa,f=pa*pa*j(k[ka],R,S,T,U));var qa=.5-V*V-W*W-X*X-Y*Y;0>qa?g=0:(qa*=qa,g=qa*qa*j(k[la],V,W,X,Y));var ra=.5-Z*Z-$*$-_*_-aa*aa;0>ra?h=0:(ra*=ra,h=ra*ra*j(k[ma],Z,$,_,aa));var sa=.5-ba*ba-ca*ca-da*da-ea*ea;return 0>sa?i=0:(sa*=sa,i=sa*sa*j(k[na],ba,ca,da,ea)),72.37855765153664*(e+f+g+h+i)},FastSimplexNoise.prototype.getSpherical2DNoise=function(a,b,c){var d=b/a,e=c/a,f=2*d*Math.PI,g=e*Math.PI,h=Math.sin(g+Math.PI),i=2*Math.PI,j=i*Math.sin(f)*h,k=i*Math.cos(f)*h,l=i*Math.cos(g);return this.get3DNoise(j,k,l)},FastSimplexNoise.prototype.getSpherical3DNoise=function(a,b,c,d){var e=b/a,f=c/a,g=2*e*Math.PI,h=f*Math.PI,i=Math.sin(h+Math.PI),j=2*Math.PI,k=j*Math.sin(g)*i,l=j*Math.cos(g)*i,m=j*Math.cos(h);return this.get4DNoise(k,l,m,d)},"undefined"!=typeof define&&define.amd&&define(function(){return FastSimplexNoise}),"undefined"!=typeof exports&&(exports.FastSimplexNoise=FastSimplexNoise),"undefined"!=typeof module&&(module.exports=FastSimplexNoise); 
     
 /**
 * 
 * @author Moussa Dembélé - mousman.com
 */

     function Particle(px, py){
            this.x = px;
            this.y = py;
            this.ax = 1;
            this.ay = 0.5;
            this.vx =0;
            this.vy = 0.5;

            this.red = 0xff;
            this.green= 0xff;
            this.blue = 0xff;
    }

    //**********************************************************************************************/
    function ECosmicparticles (width, height, canvas) {
        this.canvas = canvas;

        this.context = canvas.getContext("2d");
        
		this._width = width || 465;
		this._height = height || 465;         
        
        this.redGrid = [];       // a simplex-noise grid for red color channel
        this.greenGrid = [];     // a simplex-noise grid for green color channel
        this.blueGrid = [];     // a gradient for heat

		this.compteur = 10;
		this._particle_number = 20000;
		this.flux = 100;   
        
        this.particles = new Array(this._particle_number);
		this._particlesColor = 0xfdfddd;
        this._particleRedColor = (this._particlesColor & 0xff0000) >> 16;
        this._particleGreenColor = (this._particlesColor & 0x00ff00) >> 8;
        this._particleBlueColor = this._particlesColor & 0x0000ff;
        
        this._colorTransform = 0xeeb929;
        this._colorTransformRedColor = ((this._colorTransform & 0xff0000) >> 16) /255;
        this._colorTransformGreenColor = ((this._colorTransform & 0x00ff00) >> 8) /255;
        this._colorTransformBlueColor = (this._colorTransform & 0x0000ff) /255;
                
        
		this.xForce = 0.0008; // x sensibility to simplex map
		this.yForce = 0.0012; // y sensibility to simplex map

		this._ax = 0.90; 
		this._ay = 0.86;
		this._vx = 0.8; 
		this._vy = 0.85;	    
        
        this.gridVIndex = 0;

        this._imageData = this.context.createImageData(this._width, this._height);
        var nbPixels = this._imageData.data.length;
        var pixelsData = this._imageData.data;
        
        for (i=0; i < nbPixels ; i += 4){
                pixelsData[i+0] = 0;
                pixelsData[i+1] = 0;
                pixelsData[i+2] = 0;
                pixelsData[i+3] =0xff;
            }  
        
        this.context.putImageData(this._imageData,0,0);       
    }
    //**********************************************************************************************/
		
		ECosmicparticles.prototype.start = function(){
    		var self = this;
            
            this.reset();
            
            this.generateGreenSimplex();
            this.generateRedSimplex();
            this.generateBlueGrid();
            
            TweenLite.delayedCall(1.5,this.simplexLoop,null,this);
            
            window.requestAnimationFrame(function(){self.onFrame()});        
		}
    //**********************************************************************************************/
        
        ECosmicparticles.prototype.onFrame = function() {
            var nbPixels = this._imageData.data.length;
            var pixelsData = this._imageData.data;
			var nb = 0 +this.compteur;
            var i,j;
            var p;
            var pixelIndex;
            var ip2,ip3,ip4,ip5;
            var px,py;
            var red, green, blue;
            var gradient;
            var mean;
            
            var gridVIndex = parseInt( this.gridVIndex );
                
            var particleRedColor = 0 + this._particleRedColor; // speed optimisation
            var particleGreenColor = 0 + this._particleGreenColor;
            var particleBlueColor = 0 + this._particleBlueColor; 
            
            var colorTransformRedColor = 0 + this._colorTransformRedColor;
            var colorTransformGreenColor = 0 + this._colorTransformGreenColor;
            var colorTransformBlueColor = 0 + this._colorTransformBlueColor;
            
            var width = 0 + this._width;
            var height = 0 + this._height;
            
            this._colorTransformGreenColor = ((this._colorTransform & 0x00ff00) >> 8) /255;
            this._colorTransformBlueColor = (this._colorTransform & 0x0000ff) /255;            
            
			for( i = 0; i < nb; i++){
                
				var p = this.particles[i];
                px = parseInt(p.x);
                py = parseInt(p.y);
                
                blue = this.blueGrid[px][py];        // blue is a gradient map
                red = this.redGrid[px][py];          // simplex for x 
                green = this.greenGrid[px][py + gridVIndex];  // simplex for y
                
				p.ax += red * this.xForce;
				p.ay += green * this.yForce;
                
        gradient = 2- 2*blue +0.5;
                
				p.x += p.vx += p.ax * gradient;
				p.y += p.vy += p.ay * gradient;
                
       if ( p.x > width ) {
					p.vx = p.ax = Math.random() -0.2 ;
					p.vy = p.ay = Math.random() *2 - 1;        				
					p.x = Math.random() * width;
                    p.red = ( (particleRedColor & 0xaa) + Math.random()*0x55 );
                    p.green = ( (particleGreenColor & 0xaa) + Math.random()*0x55 );
                    p.blue = ( (particleBlueColor & 0xaa) + Math.random()*0x55 );                    
                    
					}
				else if ( p.x < 0 ) { 
					p.vx = p.ax = Math.random() -0.2;
					p.vy = p.ay = Math.random() *2 - 1;     			
					p.x = Math.random() * width;
                    p.red = ( (particleRedColor & 0xaa) + Math.random()*0x55 );
                    p.green = ( (particleGreenColor & 0xaa) + Math.random()*0x55 );
                    p.blue = ( (particleBlueColor & 0xaa) + Math.random()*0x55 );                          
					}
				if ( p.y >= height ) { 
					p.vx = p.ax = Math.random() -0.2;
					p.vy = p.ay = Math.random() *2 - 1;      			
					p.x = Math.random() * width;
                    p.y = height/2  + Math.random() * height/6  - height/6;
                    p.red = ( (particleRedColor & 0xaa) + Math.random()*0x55 );
                    p.green = ( (particleGreenColor & 0xaa) + Math.random()*0x55 );
                    p.blue = ( (particleBlueColor & 0xaa) + Math.random()*0x55 );                          
				}
				else if ( p.y < 0 ) {
					p.vx = p.ax = Math.random() -0.2;
					p.vy = p.ay = Math.random() *2 - 1;    				
					p.x =  Math.random() * width;
					p.y = height/2  + Math.random() * height/6  - height/6;
                    p.red = ( (particleRedColor & 0xaa) + Math.random()*0x55 );
                    p.green = ( (particleGreenColor & 0xaa) + Math.random()*0x55 );
                    p.blue = ( (particleBlueColor & 0xaa) + Math.random()*0x55 );                          
				}
                
                px = parseInt(p.x);
                py = parseInt(p.y);
                
                blue = 0.70+ this.blueGrid[px][py];         // top of the fire        
                
                pixelIndex = ( parseInt(p.y)*width + parseInt(p.x) ) * 4;
                p.red = pixelsData[pixelIndex] =  ( Math.min( p.red *   blue  ,0xff)  );
                p.green = pixelsData[pixelIndex+1] = ( Math.min( p.green   *   blue,0xff) );
                p.blue = pixelsData[pixelIndex+2] = ( Math.min( p.blue *   blue,0xff) );
                
                p.red += 5; 

                if ( p.red  < 20 ) {
					p.vx = p.ax = Math.random() *2 - 1;
					p.vy = p.ay = Math.random() *2 - 1; 
                    
					p.x = Math.random() * width;
					p.y = height/2 + Math.random() * height/7 - height/6;
                    
                    p.red = ( (particleRedColor & 0xcc) + Math.random()*0x33 ) ;
                    p.green = ( (particleGreenColor & 0xcc) + Math.random()*0x33);
                    p.blue = ( (particleBlueColor & 0xcc) + Math.random()*0x33) ;                      
                }                
                
				p.ax *= this._ax; 
				p.ay *= this._ay;
				p.vx *= this._vx; 
				p.vy *= this._vy;
                
			}

            // not throwing all particles at once at the begining
			if (this.compteur < this._particle_number) {
				var theflux = ( ( this.compteur + this.flux) > this._particle_number ) ? this._particle_number- this.compteur: this.flux; 
                var limit = this.compteur + theflux;
				for ( j = this.compteur; j < limit; j++) {
					this.particles[j] = new Particle( Math.random() * width, height/2 + Math.random() * height/6  - height/6);
                    this.particles[j].red = ( (this._particlesColor & 0xaa) + Math.random()*0x55 );
                    this.particles[j].green = ( (this._particlesColor & 0xaa) + Math.random()*0x55 );
                    this.particles[j].blue = ( (this._particlesColor & 0xaa) + Math.random()*0x55 );                    
                    
				}
                
				this.compteur += theflux;
			}    
            
              for (i=0; i < nbPixels ; i += 4){
                
                    // fast blurring (kind of)  
                    ip2 = ( (i-4) > 0) ? i-4 :  i+4;
                    ip3 = ( ( i+4+width*4 ) < nbPixels) ? i+4+width*4 :  i-4-width*4;
                    ip4 = ( ( i-width*4 ) > 0) ? i-width*4 :  i+width*4;
                    ip5 = ( ( i-width*8 ) > 0) ? i-width*8 :  i+width*8;   
                  
                    for (j=0; j<3; j++){
                        mean = (pixelsData[i+j] + pixelsData[ip2+j] + pixelsData[ip3+j] + pixelsData[ip4+j]) >>>2 ;
                        pixelsData[i+j] = (pixelsData[i+j]>>6 ) + mean;
                        pixelsData[ip2+j] = mean;
                        pixelsData[ip3+j] = mean;
                        pixelsData[ip4+j] = mean;
                        pixelsData[ip5+j] = (pixelsData[ip5+j]>>6 ) + mean;                  
                    }
                  
                    pixelsData[i] *= colorTransformRedColor ; 
                    pixelsData[i+1] *= colorTransformGreenColor ; 
                    pixelsData[i+2] *= colorTransformBlueColor ;                   
            }       
            
            this.context.putImageData(this._imageData,0,0);   
            
            this.gridVIndex += 2; 
            if(this.gridVIndex > height )
                this.gridVIndex = 0;
            
            var self = this;
            window.requestAnimationFrame(function(){self.onFrame()});    
        }        
        
        //**********************************************************************************************/
        
        ECosmicparticles.prototype.reset  = function(){
            
            this.greenGrid = new Array(this._width);
            this.redGrid = new Array(this._width);
            this.blueGrid = new Array(this._width);
            
            for (var x = 0; x < this._width*2; x++) {
                 this.greenGrid[x] = [];
                 this.redGrid[x] = [];
                 this.blueGrid[x] = [];
                  for (var y = 0; y < this._height*2; y++) {
                        this.greenGrid[x][y] = 0;
                        this.redGrid[x][y] = 0;
                        this.blueGrid[x][y] = 0;
                  }

            }
			
			this.particles = [];
			for( var i = 0; i < this.flux; i++){
				this.particles[i] = new Particle( Math.random() * this._width, this._height/2 + Math.random() * this._height/6   - this._height/6);      
                this.particles[i].x = this.particles[i].x;
                this.particles[i].y = this.particles[i].y;
                this.particles[i].red = ( (this._particlesColor & 0xaa) + Math.random()*0x55 );
                this.particles[i].green = ( (this._particlesColor & 0xaa) + Math.random()*0x55 );
                this.particles[i].blue = ( (this._particlesColor & 0xaa) + Math.random()*0x55 );
			}
            
			this.compteur = this.flux;            
        }
        
        //**********************************************************************************************/
  		
        ECosmicparticles.prototype.simplexLoop = function() {
            var random1 = 1 + Math.random() /2;
            var random2 = random1 + Math.random();
            
//            this.generateGreenSimplex();
            this.generateRedSimplex();
            TweenLite.delayedCall(random1,this.simplexLoop,null,this);
		}     
        
        //**********************************************************************************************/
		// x
  		ECosmicparticles.prototype.generateRedSimplex = function() {
	        var x,y,i;
            var noise;

            var redNoiseGen = new FastSimplexNoise({
                frequency: 0.02,
                max: 0xff,
                min: 0,
                octaves: 12
            });


            for (x = 0; x < this._width; x+=4) {
                  for (y = 0; y < this._height; y+=4) {
                    noise = redNoiseGen.get2DNoise(x, y) - 128;
                    this.redGrid[x][y] = noise;
                    this.redGrid[x+1][y] = noise;
                    this.redGrid[x+2][y] = noise;
                    this.redGrid[x+3][y] = noise;
                      
                    this.redGrid[x][y+1] = noise;    
                    this.redGrid[x+1][y+1] = noise;
                    this.redGrid[x+2][y+1] = noise;
                    this.redGrid[x+3][y+1] = noise;
                      
                    this.redGrid[x][y+2] = noise;
                    this.redGrid[x+1][y+2] = noise;
                    this.redGrid[x+2][y+2] = noise;                      
                    this.redGrid[x+3][y+2] = noise;                      
                                            
                    this.redGrid[x][y+3] = noise;
                    this.redGrid[x+1][y+3] = noise;
                    this.redGrid[x+2][y+3] = noise;                      
                    this.redGrid[x+3][y+3] = noise;                      
                      
                  }

            }
            
		}           
        //**********************************************************************************************/
		// y
  		ECosmicparticles.prototype.generateGreenSimplex = function() {
	        var x,y,i;
            var noise;

            var greenNoiseGen = new FastSimplexNoise({
                frequency: 0.008,
                max: 0xff,
                min: 0,
                octaves: 12
            });              
            
            for (x = 0; x < this._width; x+=4) {
                  for (y = 0; y < this._height*2; y+=4) { 
                    noise = greenNoiseGen.get2DNoise(x, y) - 180;
                    this.greenGrid[x][y] = noise;
                    this.greenGrid[x+1][y] = noise;
                    this.greenGrid[x+2][y] = noise;
                    this.greenGrid[x+3][y] = noise;
                      
                    this.greenGrid[x][y+1] = noise;    
                    this.greenGrid[x+1][y+1] = noise;
                    this.greenGrid[x+2][y+1] = noise;
                    this.greenGrid[x+3][y+1] = noise;
                      
                    this.greenGrid[x][y+2] = noise;
                    this.greenGrid[x+1][y+2] = noise;
                    this.greenGrid[x+2][y+2] = noise;                      
                    this.greenGrid[x+3][y+2] = noise;                      
                                            
                    this.greenGrid[x][y+3] = noise;
                    this.greenGrid[x+1][y+3] = noise;
                    this.greenGrid[x+2][y+3] = noise;                      
                    this.greenGrid[x+3][y+3] = noise;    
                  }

            }
            
		} 
        
        //**********************************************************************************************/
		// gradient for heat map
  		ECosmicparticles.prototype.generateBlueGrid = function() {
	        var x,y;
            var gradient; 
        
            for (x = 0; x < this._width; x+=4) {
                  for (y = 0; y < this._height; y+=4) { 
                      
                    gradient = y / this._height;
                    this.blueGrid[x][y] = gradient;
                    this.blueGrid[x+1][y] = gradient;
                    this.blueGrid[x+2][y] = gradient;
                    this.blueGrid[x+3][y] = gradient;
                      
                    this.blueGrid[x][y+1] = gradient;    
                    this.blueGrid[x+1][y+1] = gradient;
                    this.blueGrid[x+2][y+1] = gradient;
                    this.blueGrid[x+3][y+1] = gradient;
                      
                    this.blueGrid[x][y+2] = gradient;
                    this.blueGrid[x+1][y+2] = gradient;
                    this.blueGrid[x+2][y+2] = gradient;                      
                    this.blueGrid[x+3][y+2] = gradient;                      
                                            
                    this.blueGrid[x][y+3] = gradient;
                    this.blueGrid[x+1][y+3] = gradient;
                    this.blueGrid[x+2][y+3] = gradient;                      
                    this.blueGrid[x+3][y+3] = gradient;    
                  }

            }
            
		}  
     
    //**********************************************************************************************/
    var canvas = document.getElementById("mon_canvas");
    var context = canvas.getContext("2d");        

    var _cosmic = new ECosmicparticles(800, 600, canvas);
    _cosmic.start();

     
 })();