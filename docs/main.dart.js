(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isb=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isd)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="b"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="k"){processStatics(init.statics[b1]=b2.k,b3)
delete b2.k}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.b8"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.b8"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.b8(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.q=function(){}
var dart=[["","",,H,{"^":"",fq:{"^":"b;a"}}],["","",,J,{"^":"",
m:function(a){return void 0},
aH:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
aE:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.be==null){H.ez()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.c4("Return interceptor for "+H.a(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$aO()]
if(v!=null)return v
v=H.eJ(a)
if(v!=null)return v
if(typeof a=="function")return C.v
y=Object.getPrototypeOf(a)
if(y==null)return C.j
if(y===Object.prototype)return C.j
if(typeof w=="function"){Object.defineProperty(w,$.$get$aO(),{value:C.d,enumerable:false,writable:true,configurable:true})
return C.d}return C.d},
d:{"^":"b;",
m:function(a,b){return a===b},
gp:function(a){return H.E(a)},
i:["b4",function(a){return H.aq(a)}],
"%":"Blob|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString"},
cY:{"^":"d;",
i:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$iseo:1},
d_:{"^":"d;",
m:function(a,b){return null==b},
i:function(a){return"null"},
gp:function(a){return 0}},
aP:{"^":"d;",
gp:function(a){return 0},
i:["b5",function(a){return String(a)}],
$isd0:1},
dc:{"^":"aP;"},
aw:{"^":"aP;"},
ab:{"^":"aP;",
i:function(a){var z=a[$.$get$bo()]
return z==null?this.b5(a):J.J(z)},
$signature:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
a9:{"^":"d;$ti",
aH:function(a,b){if(!!a.immutable$list)throw H.c(new P.F(b))},
br:function(a,b){if(!!a.fixed$length)throw H.c(new P.F(b))},
T:function(a,b){return new H.aT(a,b,[null,null])},
D:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
gbA:function(a){if(a.length>0)return a[0]
throw H.c(H.bz())},
an:function(a,b,c,d,e){var z,y,x
this.aH(a,"set range")
P.bN(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.c(H.cW())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.am(a,"[","]")},
gt:function(a){return new J.cy(a,a.length,0,null)},
gp:function(a){return H.E(a)},
gj:function(a){return a.length},
sj:function(a,b){this.br(a,"set length")
if(b<0)throw H.c(P.ar(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.n(a,b))
if(b>=a.length||b<0)throw H.c(H.n(a,b))
return a[b]},
q:function(a,b,c){this.aH(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.n(a,b))
if(b>=a.length||b<0)throw H.c(H.n(a,b))
a[b]=c},
$isz:1,
$asz:I.q,
$isj:1,
$asj:null,
$isf:1,
$asf:null},
fp:{"^":"a9;$ti"},
cy:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.eT(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aa:{"^":"d;",
aj:function(a,b){return a%b},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
X:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a+b},
B:function(a,b){return(a|0)===a?a/b|0:this.bm(a,b)},
bm:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.F("Result of truncating division is "+H.a(z)+": "+H.a(a)+" ~/ "+b))},
aD:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
a3:function(a,b){if(typeof b!=="number")throw H.c(H.S(b))
return a<b},
$isa3:1},
bA:{"^":"aa;",$isv:1,$isa3:1,$isi:1},
cZ:{"^":"aa;",$isv:1,$isa3:1},
an:{"^":"d;",
X:function(a,b){if(typeof b!=="string")throw H.c(P.bj(b,null,null))
return a+b},
ao:function(a,b,c){if(c==null)c=a.length
H.ep(c)
if(b<0)throw H.c(P.as(b,null,null))
if(typeof c!=="number")return H.a2(c)
if(b>c)throw H.c(P.as(b,null,null))
if(c>a.length)throw H.c(P.as(c,null,null))
return a.substring(b,c)},
b3:function(a,b){return this.ao(a,b,null)},
i:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.n(a,b))
if(b>=a.length||b<0)throw H.c(H.n(a,b))
return a[b]},
$isz:1,
$asz:I.q,
$isN:1}}],["","",,H,{"^":"",
bz:function(){return new P.au("No element")},
cW:function(){return new P.au("Too few elements")},
f:{"^":"y;$ti",$asf:null},
ac:{"^":"f;$ti",
gt:function(a){return new H.bB(this,this.gj(this),0,null)},
T:function(a,b){return new H.aT(this,b,[H.G(this,"ac",0),null])},
am:function(a,b){var z,y,x
z=H.H([],[H.G(this,"ac",0)])
C.c.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.D(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
aR:function(a){return this.am(a,!0)}},
bB:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z,y,x,w
z=this.a
y=J.t(z)
x=y.gj(z)
if(this.b!==x)throw H.c(new P.U(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.D(z,w);++this.c
return!0}},
bD:{"^":"y;a,b,$ti",
gt:function(a){return new H.d8(null,J.aJ(this.a),this.b,this.$ti)},
gj:function(a){return J.a6(this.a)},
$asy:function(a,b){return[b]},
k:{
ao:function(a,b,c,d){if(!!J.m(a).$isf)return new H.bq(a,b,[c,d])
return new H.bD(a,b,[c,d])}}},
bq:{"^":"bD;a,b,$ti",$isf:1,
$asf:function(a,b){return[b]}},
d8:{"^":"cX;a,b,c,$ti",
l:function(){var z=this.b
if(z.l()){this.a=this.c.$1(z.gn())
return!0}this.a=null
return!1},
gn:function(){return this.a}},
aT:{"^":"ac;a,b,$ti",
gj:function(a){return J.a6(this.a)},
D:function(a,b){return this.b.$1(J.cw(this.a,b))},
$asac:function(a,b){return[b]},
$asf:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
bw:{"^":"b;$ti"}}],["","",,H,{"^":"",
ae:function(a,b){var z=a.P(b)
if(!init.globalState.d.cy)init.globalState.f.V()
return z},
cq:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isj)throw H.c(P.ah("Arguments to main must be a List: "+H.a(y)))
init.globalState=new H.dY(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$bx()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.dD(P.aR(null,H.ad),0)
x=P.i
y.z=new H.M(0,null,null,null,null,null,0,[x,H.b3])
y.ch=new H.M(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.dX()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.cP,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.dZ)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=new H.M(0,null,null,null,null,null,0,[x,H.at])
x=P.W(null,null,null,x)
v=new H.at(0,null,!1)
u=new H.b3(y,w,x,init.createNewIsolate(),v,new H.L(H.aI()),new H.L(H.aI()),!1,!1,[],P.W(null,null,null,null),null,null,!1,!0,P.W(null,null,null,null))
x.a1(0,0)
u.ar(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aD()
if(H.a1(y,[y]).H(a))u.P(new H.eR(z,a))
else if(H.a1(y,[y,y]).H(a))u.P(new H.eS(z,a))
else u.P(a)
init.globalState.f.V()},
cT:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.cU()
return},
cU:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.F("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.F('Cannot extract URI from "'+H.a(z)+'"'))},
cP:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.ax(!0,[]).C(b.data)
y=J.t(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.ax(!0,[]).C(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.ax(!0,[]).C(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.i
p=new H.M(0,null,null,null,null,null,0,[q,H.at])
q=P.W(null,null,null,q)
o=new H.at(0,null,!1)
n=new H.b3(y,p,q,init.createNewIsolate(),o,new H.L(H.aI()),new H.L(H.aI()),!1,!1,[],P.W(null,null,null,null),null,null,!1,!0,P.W(null,null,null,null))
q.a1(0,0)
n.ar(0,o)
init.globalState.f.a.w(new H.ad(n,new H.cQ(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.V()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").A(y.h(z,"msg"))
init.globalState.f.V()
break
case"close":init.globalState.ch.U(0,$.$get$by().h(0,a))
a.terminate()
init.globalState.f.V()
break
case"log":H.cO(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.V(["command","print","msg",z])
q=new H.P(!0,P.Y(null,P.i)).u(q)
y.toString
self.postMessage(q)}else P.bh(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
cO:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.V(["command","log","msg",a])
x=new H.P(!0,P.Y(null,P.i)).u(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.u(w)
throw H.c(P.al(z))}},
cR:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.bK=$.bK+("_"+y)
$.bL=$.bL+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.A(["spawned",new H.ay(y,x),w,z.r])
x=new H.cS(a,b,c,d,z)
if(e===!0){z.aG(w,w)
init.globalState.f.a.w(new H.ad(z,x,"start isolate"))}else x.$0()},
e9:function(a){return new H.ax(!0,[]).C(new H.P(!1,P.Y(null,P.i)).u(a))},
eR:{"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
eS:{"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
dY:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",k:{
dZ:function(a){var z=P.V(["command","print","msg",a])
return new H.P(!0,P.Y(null,P.i)).u(z)}}},
b3:{"^":"b;a,b,c,bN:d<,bu:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
aG:function(a,b){if(!this.f.m(0,a))return
if(this.Q.a1(0,b)&&!this.y)this.y=!0
this.af()},
bS:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.U(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.h(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.h(v,w)
v[w]=x
if(w===y.c)y.ay();++y.d}this.y=!1}this.af()},
bo:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
bR:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.o(new P.F("removeRange"))
P.bN(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
b1:function(a,b){if(!this.r.m(0,a))return
this.db=b},
bF:function(a,b,c){var z=J.m(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){a.A(c)
return}z=this.cx
if(z==null){z=P.aR(null,null)
this.cx=z}z.w(new H.dS(a,c))},
bE:function(a,b){var z
if(!this.r.m(0,a))return
z=J.m(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){this.ai()
return}z=this.cx
if(z==null){z=P.aR(null,null)
this.cx=z}z.w(this.gbO())},
bG:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bh(a)
if(b!=null)P.bh(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.J(a)
y[1]=b==null?null:J.J(b)
for(x=new P.c8(z,z.r,null,null),x.c=z.e;x.l();)x.d.A(y)},
P:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.B(u)
w=t
v=H.u(u)
this.bG(w,v)
if(this.db===!0){this.ai()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gbN()
if(this.cx!=null)for(;t=this.cx,!t.ga2(t);)this.cx.aO().$0()}return y},
aN:function(a){return this.b.h(0,a)},
ar:function(a,b){var z=this.b
if(z.aI(a))throw H.c(P.al("Registry: ports must be registered only once."))
z.q(0,a,b)},
af:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.q(0,this.a,this)
else this.ai()},
ai:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.I(0)
for(z=this.b,y=z.gaT(z),y=y.gt(y);y.l();)y.gn().b9()
z.I(0)
this.c.I(0)
init.globalState.z.U(0,this.a)
this.dx.I(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.A(z[v])}this.ch=null}},"$0","gbO",0,0,2]},
dS:{"^":"e:2;a,b",
$0:function(){this.a.A(this.b)}},
dD:{"^":"b;a,b",
bv:function(){var z=this.a
if(z.b===z.c)return
return z.aO()},
aQ:function(){var z,y,x
z=this.bv()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aI(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga2(y)}else y=!1
else y=!1
else y=!1
if(y)H.o(P.al("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga2(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.V(["command","close"])
x=new H.P(!0,new P.c9(0,null,null,null,null,null,0,[null,P.i])).u(x)
y.toString
self.postMessage(x)}return!1}z.bQ()
return!0},
aC:function(){if(self.window!=null)new H.dE(this).$0()
else for(;this.aQ(););},
V:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.aC()
else try{this.aC()}catch(x){w=H.B(x)
z=w
y=H.u(x)
w=init.globalState.Q
v=P.V(["command","error","msg",H.a(z)+"\n"+H.a(y)])
v=new H.P(!0,P.Y(null,P.i)).u(v)
w.toString
self.postMessage(v)}}},
dE:{"^":"e:2;a",
$0:function(){if(!this.a.aQ())return
P.ds(C.e,this)}},
ad:{"^":"b;a,b,c",
bQ:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.P(this.b)}},
dX:{"^":"b;"},
cQ:{"^":"e:0;a,b,c,d,e,f",
$0:function(){H.cR(this.a,this.b,this.c,this.d,this.e,this.f)}},
cS:{"^":"e:2;a,b,c,d,e",
$0:function(){var z,y,x
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aD()
if(H.a1(x,[x,x]).H(y))y.$2(this.b,this.c)
else if(H.a1(x,[x]).H(y))y.$1(this.b)
else y.$0()}z.af()}},
c6:{"^":"b;"},
ay:{"^":"c6;b,a",
A:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gaz())return
x=H.e9(a)
if(z.gbu()===y){y=J.t(x)
switch(y.h(x,0)){case"pause":z.aG(y.h(x,1),y.h(x,2))
break
case"resume":z.bS(y.h(x,1))
break
case"add-ondone":z.bo(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.bR(y.h(x,1))
break
case"set-errors-fatal":z.b1(y.h(x,1),y.h(x,2))
break
case"ping":z.bF(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.bE(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a1(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.U(0,y)
break}return}init.globalState.f.a.w(new H.ad(z,new H.e_(this,x),"receive"))},
m:function(a,b){if(b==null)return!1
return b instanceof H.ay&&J.I(this.b,b.b)},
gp:function(a){return this.b.ga7()}},
e_:{"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gaz())z.b8(this.b)}},
b5:{"^":"c6;b,c,a",
A:function(a){var z,y,x
z=P.V(["command","message","port",this,"msg",a])
y=new H.P(!0,P.Y(null,P.i)).u(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
m:function(a,b){if(b==null)return!1
return b instanceof H.b5&&J.I(this.b,b.b)&&J.I(this.a,b.a)&&J.I(this.c,b.c)},
gp:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.b2()
y=this.a
if(typeof y!=="number")return y.b2()
x=this.c
if(typeof x!=="number")return H.a2(x)
return(z<<16^y<<8^x)>>>0}},
at:{"^":"b;a7:a<,b,az:c<",
b9:function(){this.c=!0
this.b=null},
b8:function(a){if(this.c)return
this.b.$1(a)},
$isde:1},
dn:{"^":"b;a,b,c",
b7:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.w(new H.ad(y,new H.dq(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.af(new H.dr(this,b),0),a)}else throw H.c(new P.F("Timer greater than 0."))},
k:{
dp:function(a,b){var z=new H.dn(!0,!1,null)
z.b7(a,b)
return z}}},
dq:{"^":"e:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
dr:{"^":"e:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
L:{"^":"b;a7:a<",
gp:function(a){var z=this.a
if(typeof z!=="number")return z.bY()
z=C.f.aD(z,0)^C.f.B(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
m:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.L){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
P:{"^":"b;a,b",
u:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.gj(z))
z=J.m(a)
if(!!z.$isbE)return["buffer",a]
if(!!z.$isaW)return["typed",a]
if(!!z.$isz)return this.aY(a)
if(!!z.$iscN){x=this.gaV()
w=a.gaM()
w=H.ao(w,x,H.G(w,"y",0),null)
w=P.aS(w,!0,H.G(w,"y",0))
z=z.gaT(a)
z=H.ao(z,x,H.G(z,"y",0),null)
return["map",w,P.aS(z,!0,H.G(z,"y",0))]}if(!!z.$isd0)return this.aZ(a)
if(!!z.$isd)this.aS(a)
if(!!z.$isde)this.W(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isay)return this.b_(a)
if(!!z.$isb5)return this.b0(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.W(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isL)return["capability",a.a]
if(!(a instanceof P.b))this.aS(a)
return["dart",init.classIdExtractor(a),this.aX(init.classFieldsExtractor(a))]},"$1","gaV",2,0,1],
W:function(a,b){throw H.c(new P.F(H.a(b==null?"Can't transmit:":b)+" "+H.a(a)))},
aS:function(a){return this.W(a,null)},
aY:function(a){var z=this.aW(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.W(a,"Can't serialize indexable: ")},
aW:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.u(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
aX:function(a){var z
for(z=0;z<a.length;++z)C.c.q(a,z,this.u(a[z]))
return a},
aZ:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.W(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.u(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
b0:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
b_:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.ga7()]
return["raw sendport",a]}},
ax:{"^":"b;a,b",
C:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.ah("Bad serialized message: "+H.a(a)))
switch(C.c.gbA(a)){case"ref":if(1>=a.length)return H.h(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.h(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.H(this.O(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return H.H(this.O(x),[null])
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.O(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.H(this.O(x),[null])
y.fixed$length=Array
return y
case"map":return this.by(a)
case"sendport":return this.bz(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.bx(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.L(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.O(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.a(a))}},"$1","gbw",2,0,1],
O:function(a){var z,y,x
z=J.t(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.a2(x)
if(!(y<x))break
z.q(a,y,this.C(z.h(a,y)));++y}return a},
by:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.d6()
this.b.push(w)
y=J.cx(y,this.gbw()).aR(0)
for(z=J.t(y),v=J.t(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.q(0,y[u],this.C(v.h(x,u)))}return w},
bz:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.I(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.aN(w)
if(u==null)return
t=new H.ay(u,x)}else t=new H.b5(y,w,x)
this.b.push(t)
return t},
bx:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.t(y)
v=J.t(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.a2(t)
if(!(u<t))break
w[z.h(y,u)]=this.C(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
eu:function(a){return init.types[a]},
eI:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isC},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.J(a)
if(typeof z!=="string")throw H.c(H.S(a))
return z},
E:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
aZ:function(a){var z,y,x,w,v,u,t,s,r
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.m||!!J.m(a).$isaw){v=C.i(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1)r=w.charCodeAt(0)===36
else r=!1
if(r)w=C.n.b3(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cl(H.bb(a),0,null),init.mangledGlobalNames)},
aq:function(a){return"Instance of '"+H.aZ(a)+"'"},
aY:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.S(a))
return a[b]},
bM:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.S(a))
a[b]=c},
a2:function(a){throw H.c(H.S(a))},
h:function(a,b){if(a==null)J.a6(a)
throw H.c(H.n(a,b))},
n:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.K(!0,b,"index",null)
z=J.a6(a)
if(!(b<0)){if(typeof z!=="number")return H.a2(z)
y=b>=z}else y=!0
if(y)return P.aN(b,a,"index",null,z)
return P.as(b,"index",null)},
S:function(a){return new P.K(!0,a,null,null)},
ep:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.S(a))
return a},
c:function(a){var z
if(a==null)a=new P.aX()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.cs})
z.name=""}else z.toString=H.cs
return z},
cs:function(){return J.J(this.dartException)},
o:function(a){throw H.c(a)},
eT:function(a){throw H.c(new P.U(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.eV(a)
if(a==null)return
if(a instanceof H.aM)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.aD(x,16)&8191)===10)switch(w){case 438:return z.$1(H.aQ(H.a(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.a(y)+" (Error "+w+")"
return z.$1(new H.bJ(v,null))}}if(a instanceof TypeError){u=$.$get$bU()
t=$.$get$bV()
s=$.$get$bW()
r=$.$get$bX()
q=$.$get$c0()
p=$.$get$c1()
o=$.$get$bZ()
$.$get$bY()
n=$.$get$c3()
m=$.$get$c2()
l=u.v(y)
if(l!=null)return z.$1(H.aQ(y,l))
else{l=t.v(y)
if(l!=null){l.method="call"
return z.$1(H.aQ(y,l))}else{l=s.v(y)
if(l==null){l=r.v(y)
if(l==null){l=q.v(y)
if(l==null){l=p.v(y)
if(l==null){l=o.v(y)
if(l==null){l=r.v(y)
if(l==null){l=n.v(y)
if(l==null){l=m.v(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.bJ(y,l==null?null:l.method))}}return z.$1(new H.du(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.bQ()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.K(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.bQ()
return a},
u:function(a){var z
if(a instanceof H.aM)return a.b
if(a==null)return new H.ca(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ca(a,null)},
eM:function(a){if(a==null||typeof a!='object')return J.ag(a)
else return H.E(a)},
eq:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
eC:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ae(b,new H.eD(a))
case 1:return H.ae(b,new H.eE(a,d))
case 2:return H.ae(b,new H.eF(a,d,e))
case 3:return H.ae(b,new H.eG(a,d,e,f))
case 4:return H.ae(b,new H.eH(a,d,e,f,g))}throw H.c(P.al("Unsupported number of arguments for wrapped closure"))},
af:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.eC)
a.$identity=z
return z},
cF:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isj){z.$reflectionInfo=c
x=H.dg(z).r}else x=c
w=d?Object.create(new H.dl().constructor.prototype):Object.create(new H.aK(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.w
$.w=J.a4(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.bn(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.eu,x)
else if(u&&typeof x=="function"){q=t?H.bl:H.aL
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bn(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
cC:function(a,b,c,d){var z=H.aL
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bn:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.cE(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.cC(y,!w,z,b)
if(y===0){w=$.w
$.w=J.a4(w,1)
u="self"+H.a(w)
w="return function(){var "+u+" = this."
v=$.T
if(v==null){v=H.aj("self")
$.T=v}return new Function(w+H.a(v)+";return "+u+"."+H.a(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.w
$.w=J.a4(w,1)
t+=H.a(w)
w="return function("+t+"){return this."
v=$.T
if(v==null){v=H.aj("self")
$.T=v}return new Function(w+H.a(v)+"."+H.a(z)+"("+t+");}")()},
cD:function(a,b,c,d){var z,y
z=H.aL
y=H.bl
switch(b?-1:a){case 0:throw H.c(new H.dh("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
cE:function(a,b){var z,y,x,w,v,u,t,s
z=H.cz()
y=$.bk
if(y==null){y=H.aj("receiver")
$.bk=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.cD(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.w
$.w=J.a4(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.w
$.w=J.a4(u,1)
return new Function(y+H.a(u)+"}")()},
b8:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.cF(a,b,z,!!d,e,f)},
eO:function(a,b){var z=J.t(b)
throw H.c(H.cB(H.aZ(a),z.ao(b,3,z.gj(b))))},
eB:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.m(a)[b]
else z=!0
if(z)return a
H.eO(a,b)},
eU:function(a){throw H.c(new P.cH("Cyclic initialization for static "+H.a(a)))},
a1:function(a,b,c){return new H.di(a,b,c,null)},
aD:function(){return C.k},
aI:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
cj:function(a){return init.getIsolateTag(a)},
H:function(a,b){a.$ti=b
return a},
bb:function(a){if(a==null)return
return a.$ti},
et:function(a,b){return H.cr(a["$as"+H.a(b)],H.bb(a))},
G:function(a,b,c){var z=H.et(a,b)
return z==null?null:z[c]},
aF:function(a,b){var z=H.bb(a)
return z==null?null:z[b]},
cp:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cl(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.a.i(a)
else return},
cl:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.b0("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.a(H.cp(u,c))}return w?"":"<"+z.i(0)+">"},
cr:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
ek:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.r(a[y],b[y]))return!1
return!0},
r:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.ck(a,b)
if('func' in a)return b.builtin$cls==="fl"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.cp(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+H.a(v)]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.ek(H.cr(u,z),x)},
cg:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.r(z,v)||H.r(v,z)))return!1}return!0},
ej:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.r(v,u)||H.r(u,v)))return!1}return!0},
ck:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.r(z,y)||H.r(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.cg(x,w,!1))return!1
if(!H.cg(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.r(o,n)||H.r(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.r(o,n)||H.r(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.r(o,n)||H.r(n,o)))return!1}}return H.ej(a.named,b.named)},
h2:function(a){var z=$.bc
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
h1:function(a){return H.E(a)},
h0:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
eJ:function(a){var z,y,x,w,v,u
z=$.bc.$1(a)
y=$.aC[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aG[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.cf.$2(a,z)
if(z!=null){y=$.aC[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aG[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bg(x)
$.aC[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.aG[z]=x
return x}if(v==="-"){u=H.bg(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.cn(a,x)
if(v==="*")throw H.c(new P.c4(z))
if(init.leafTags[z]===true){u=H.bg(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.cn(a,x)},
cn:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.aH(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bg:function(a){return J.aH(a,!1,null,!!a.$isC)},
eK:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.aH(z,!1,null,!!z.$isC)
else return J.aH(z,c,null,null)},
ez:function(){if(!0===$.be)return
$.be=!0
H.eA()},
eA:function(){var z,y,x,w,v,u,t,s
$.aC=Object.create(null)
$.aG=Object.create(null)
H.ev()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.co.$1(v)
if(u!=null){t=H.eK(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ev:function(){var z,y,x,w,v,u,t
z=C.r()
z=H.R(C.o,H.R(C.u,H.R(C.h,H.R(C.h,H.R(C.t,H.R(C.p,H.R(C.q(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bc=new H.ew(v)
$.cf=new H.ex(u)
$.co=new H.ey(t)},
R:function(a,b){return a(b)||b},
df:{"^":"b;a,b,c,d,e,f,r,x",k:{
dg:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.df(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
dt:{"^":"b;a,b,c,d,e,f",
v:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
k:{
A:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.dt(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
av:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
c_:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
bJ:{"^":"p;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.a(this.a)
return"NullError: method not found: '"+H.a(z)+"' on null"}},
d2:{"^":"p;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.a(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.a(z)+"' ("+H.a(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.a(z)+"' on '"+H.a(y)+"' ("+H.a(this.a)+")"},
k:{
aQ:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.d2(a,y,z?null:b.receiver)}}},
du:{"^":"p;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
aM:{"^":"b;a,F:b<"},
eV:{"^":"e:1;a",
$1:function(a){if(!!J.m(a).$isp)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ca:{"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
eD:{"^":"e:0;a",
$0:function(){return this.a.$0()}},
eE:{"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
eF:{"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
eG:{"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
eH:{"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{"^":"b;",
i:function(a){return"Closure '"+H.aZ(this)+"'"},
gaU:function(){return this},
gaU:function(){return this}},
bT:{"^":"e;"},
dl:{"^":"bT;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
aK:{"^":"bT;a,b,c,d",
m:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.aK))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.E(this.a)
else y=typeof z!=="object"?J.ag(z):H.E(z)
z=H.E(this.b)
if(typeof y!=="number")return y.bZ()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.aq(z)},
k:{
aL:function(a){return a.a},
bl:function(a){return a.c},
cz:function(){var z=$.T
if(z==null){z=H.aj("self")
$.T=z}return z},
aj:function(a){var z,y,x,w,v
z=new H.aK("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
cA:{"^":"p;a",
i:function(a){return this.a},
k:{
cB:function(a,b){return new H.cA("CastError: Casting value of type "+H.a(a)+" to incompatible type "+H.a(b))}}},
dh:{"^":"p;a",
i:function(a){return"RuntimeError: "+H.a(this.a)}},
bP:{"^":"b;"},
di:{"^":"bP;a,b,c,d",
H:function(a){var z=this.bf(a)
return z==null?!1:H.ck(z,this.L())},
bf:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
L:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$isfP)z.v=true
else if(!x.$isbp)z.ret=y.L()
y=this.b
if(y!=null&&y.length!==0)z.args=H.bO(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.bO(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.ci(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].L()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.ci(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.a(z[s].L())+" "+s}x+="}"}}return x+(") -> "+H.a(this.a))},
k:{
bO:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].L())
return z}}},
bp:{"^":"bP;",
i:function(a){return"dynamic"},
L:function(){return}},
M:{"^":"b;a,b,c,d,e,f,r,$ti",
gj:function(a){return this.a},
ga2:function(a){return this.a===0},
gaM:function(){return new H.d4(this,[H.aF(this,0)])},
gaT:function(a){return H.ao(this.gaM(),new H.d1(this),H.aF(this,0),H.aF(this,1))},
aI:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.bc(z,a)}else return this.bK(a)},
bK:function(a){var z=this.d
if(z==null)return!1
return this.S(this.a_(z,this.R(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.N(z,b)
return y==null?null:y.gE()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.N(x,b)
return y==null?null:y.gE()}else return this.bL(b)},
bL:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a_(z,this.R(a))
x=this.S(y,a)
if(x<0)return
return y[x].gE()},
q:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.a9()
this.b=z}this.ap(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.a9()
this.c=y}this.ap(y,b,c)}else{x=this.d
if(x==null){x=this.a9()
this.d=x}w=this.R(b)
v=this.a_(x,w)
if(v==null)this.ad(x,w,[this.aa(b,c)])
else{u=this.S(v,b)
if(u>=0)v[u].sE(c)
else v.push(this.aa(b,c))}}},
U:function(a,b){if(typeof b==="string")return this.aB(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aB(this.c,b)
else return this.bM(b)},
bM:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a_(z,this.R(a))
x=this.S(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.aF(w)
return w.gE()},
I:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bB:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.U(this))
z=z.c}},
ap:function(a,b,c){var z=this.N(a,b)
if(z==null)this.ad(a,b,this.aa(b,c))
else z.sE(c)},
aB:function(a,b){var z
if(a==null)return
z=this.N(a,b)
if(z==null)return
this.aF(z)
this.aw(a,b)
return z.gE()},
aa:function(a,b){var z,y
z=new H.d3(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
aF:function(a){var z,y
z=a.gbi()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
R:function(a){return J.ag(a)&0x3ffffff},
S:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.I(a[y].gaL(),b))return y
return-1},
i:function(a){return P.d9(this)},
N:function(a,b){return a[b]},
a_:function(a,b){return a[b]},
ad:function(a,b,c){a[b]=c},
aw:function(a,b){delete a[b]},
bc:function(a,b){return this.N(a,b)!=null},
a9:function(){var z=Object.create(null)
this.ad(z,"<non-identifier-key>",z)
this.aw(z,"<non-identifier-key>")
return z},
$iscN:1},
d1:{"^":"e:1;a",
$1:function(a){return this.a.h(0,a)}},
d3:{"^":"b;aL:a<,E:b@,c,bi:d<"},
d4:{"^":"f;a,$ti",
gj:function(a){return this.a.a},
gt:function(a){var z,y
z=this.a
y=new H.d5(z,z.r,null,null)
y.c=z.e
return y}},
d5:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.U(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ew:{"^":"e:1;a",
$1:function(a){return this.a(a)}},
ex:{"^":"e:5;a",
$2:function(a,b){return this.a(a,b)}},
ey:{"^":"e:6;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
ci:function(a){var z=H.H(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
eN:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",bE:{"^":"d;",$isbE:1,"%":"ArrayBuffer"},aW:{"^":"d;",$isaW:1,"%":"DataView;ArrayBufferView;aU|bF|bH|aV|bG|bI|D"},aU:{"^":"aW;",
gj:function(a){return a.length},
$isC:1,
$asC:I.q,
$isz:1,
$asz:I.q},aV:{"^":"bH;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
a[b]=c}},bF:{"^":"aU+bC;",$asC:I.q,$asz:I.q,
$asj:function(){return[P.v]},
$asf:function(){return[P.v]},
$isj:1,
$isf:1},bH:{"^":"bF+bw;",$asC:I.q,$asz:I.q,
$asj:function(){return[P.v]},
$asf:function(){return[P.v]}},D:{"^":"bI;",
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]}},bG:{"^":"aU+bC;",$asC:I.q,$asz:I.q,
$asj:function(){return[P.i]},
$asf:function(){return[P.i]},
$isj:1,
$isf:1},bI:{"^":"bG+bw;",$asC:I.q,$asz:I.q,
$asj:function(){return[P.i]},
$asf:function(){return[P.i]}},fu:{"^":"aV;",$isj:1,
$asj:function(){return[P.v]},
$isf:1,
$asf:function(){return[P.v]},
"%":"Float32Array"},fv:{"^":"aV;",$isj:1,
$asj:function(){return[P.v]},
$isf:1,
$asf:function(){return[P.v]},
"%":"Float64Array"},fw:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Int16Array"},fx:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Int32Array"},fy:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Int8Array"},fz:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Uint16Array"},fA:{"^":"D;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Uint32Array"},fB:{"^":"D;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"CanvasPixelArray|Uint8ClampedArray"},fC:{"^":"D;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
dx:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.el()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.af(new P.dz(z),1)).observe(y,{childList:true})
return new P.dy(z,y,x)}else if(self.setImmediate!=null)return P.em()
return P.en()},
fQ:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.af(new P.dA(a),0))},"$1","el",2,0,3],
fR:[function(a){++init.globalState.f.b
self.setImmediate(H.af(new P.dB(a),0))},"$1","em",2,0,3],
fS:[function(a){P.b1(C.e,a)},"$1","en",2,0,3],
az:function(a,b,c){if(b===0){J.cv(c,a)
return}else if(b===1){c.bs(H.B(a),H.u(a))
return}P.e6(a,b)
return c.gbC()},
e6:function(a,b){var z,y,x,w
z=new P.e7(b)
y=new P.e8(b)
x=J.m(a)
if(!!x.$isO)a.ae(z,y)
else if(!!x.$isa7)a.al(z,y)
else{w=new P.O(0,$.l,null,[null])
w.a=4
w.c=a
w.ae(z,null)}},
eg:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.l.toString
return new P.eh(z)},
ec:function(a,b){var z=H.aD()
if(H.a1(z,[z,z]).H(a)){b.toString
return a}else{b.toString
return a}},
cG:function(a){return new P.cb(new P.O(0,$.l,null,[a]),[a])},
eb:function(){var z,y
for(;z=$.Q,z!=null;){$.a_=null
y=z.b
$.Q=y
if(y==null)$.Z=null
z.a.$0()}},
h_:[function(){$.b6=!0
try{P.eb()}finally{$.a_=null
$.b6=!1
if($.Q!=null)$.$get$b2().$1(P.ch())}},"$0","ch",0,0,2],
ce:function(a){var z=new P.c5(a,null)
if($.Q==null){$.Z=z
$.Q=z
if(!$.b6)$.$get$b2().$1(P.ch())}else{$.Z.b=z
$.Z=z}},
ef:function(a){var z,y,x
z=$.Q
if(z==null){P.ce(a)
$.a_=$.Z
return}y=new P.c5(a,null)
x=$.a_
if(x==null){y.b=z
$.a_=y
$.Q=y}else{y.b=x.b
x.b=y
$.a_=y
if(y.b==null)$.Z=y}},
eQ:function(a){var z=$.l
if(C.b===z){P.aB(null,null,C.b,a)
return}z.toString
P.aB(null,null,z,z.ag(a,!0))},
fJ:function(a,b){return new P.e4(null,a,!1,[b])},
ds:function(a,b){var z=$.l
if(z===C.b){z.toString
return P.b1(a,b)}return P.b1(a,z.ag(b,!0))},
b1:function(a,b){var z=C.a.B(a.a,1000)
return H.dp(z<0?0:z,b)},
aA:function(a,b,c,d,e){var z={}
z.a=d
P.ef(new P.ed(z,e))},
cc:function(a,b,c,d){var z,y
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
cd:function(a,b,c,d,e){var z,y
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
ee:function(a,b,c,d,e,f){var z,y
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
aB:function(a,b,c,d){var z=C.b!==c
if(z)d=c.ag(d,!(!z||!1))
P.ce(d)},
dz:{"^":"e:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
dy:{"^":"e:7;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
dA:{"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
dB:{"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
e7:{"^":"e:1;a",
$1:function(a){return this.a.$2(0,a)}},
e8:{"^":"e:8;a",
$2:function(a,b){this.a.$2(1,new H.aM(a,b))}},
eh:{"^":"e:9;a",
$2:function(a,b){this.a(a,b)}},
a7:{"^":"b;$ti"},
dC:{"^":"b;bC:a<,$ti",
bs:function(a,b){a=a!=null?a:new P.aX()
if(this.a.a!==0)throw H.c(new P.au("Future already completed"))
$.l.toString
this.M(a,b)}},
cb:{"^":"dC;a,$ti",
ah:function(a,b){var z=this.a
if(z.a!==0)throw H.c(new P.au("Future already completed"))
z.av(b)},
M:function(a,b){this.a.M(a,b)}},
dG:{"^":"b;ab:a<,b,c,d,e",
gbn:function(){return this.b.b},
gaK:function(){return(this.c&1)!==0},
gbJ:function(){return(this.c&2)!==0},
gaJ:function(){return this.c===8},
bH:function(a){return this.b.b.ak(this.d,a)},
bP:function(a){if(this.c!==6)return!0
return this.b.b.ak(this.d,J.a5(a))},
bD:function(a){var z,y,x,w
z=this.e
y=H.aD()
x=J.ba(a)
w=this.b.b
if(H.a1(y,[y,y]).H(z))return w.bT(z,x.gJ(a),a.gF())
else return w.ak(z,x.gJ(a))},
bI:function(){return this.b.b.aP(this.d)}},
O:{"^":"b;aE:a<,b,bl:c<,$ti",
gbg:function(){return this.a===2},
ga8:function(){return this.a>=4},
al:function(a,b){var z=$.l
if(z!==C.b){z.toString
if(b!=null)b=P.ec(b,z)}return this.ae(a,b)},
bW:function(a){return this.al(a,null)},
ae:function(a,b){var z=new P.O(0,$.l,null,[null])
this.aq(new P.dG(null,z,b==null?1:3,a,b))
return z},
aq:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.ga8()){y.aq(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.aB(null,null,z,new P.dH(this,a))}},
aA:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gab()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.ga8()){v.aA(a)
return}this.a=v.a
this.c=v.c}z.a=this.a0(a)
y=this.b
y.toString
P.aB(null,null,y,new P.dM(z,this))}},
ac:function(){var z=this.c
this.c=null
return this.a0(z)},
a0:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gab()
z.a=y}return y},
av:function(a){var z
if(!!J.m(a).$isa7)P.c7(a,this)
else{z=this.ac()
this.a=4
this.c=a
P.X(this,z)}},
M:function(a,b){var z=this.ac()
this.a=8
this.c=new P.ai(a,b)
P.X(this,z)},
$isa7:1,
k:{
dI:function(a,b){var z,y,x,w
b.a=1
try{a.al(new P.dJ(b),new P.dK(b))}catch(x){w=H.B(x)
z=w
y=H.u(x)
P.eQ(new P.dL(b,z,y))}},
c7:function(a,b){var z,y,x
for(;a.gbg();)a=a.c
z=a.ga8()
y=b.c
if(z){b.c=null
x=b.a0(y)
b.a=a.a
b.c=a.c
P.X(b,x)}else{b.a=2
b.c=a
a.aA(y)}},
X:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.a5(v)
x=v.gF()
z.toString
P.aA(null,null,z,y,x)}return}for(;b.gab()!=null;b=u){u=b.a
b.a=null
P.X(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gaK()||b.gaJ()){s=b.gbn()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.a5(v)
r=v.gF()
y.toString
P.aA(null,null,y,x,r)
return}q=$.l
if(q==null?s!=null:q!==s)$.l=s
else q=null
if(b.gaJ())new P.dP(z,x,w,b).$0()
else if(y){if(b.gaK())new P.dO(x,b,t).$0()}else if(b.gbJ())new P.dN(z,x,b).$0()
if(q!=null)$.l=q
y=x.b
r=J.m(y)
if(!!r.$isa7){p=b.b
if(!!r.$isO)if(y.a>=4){o=p.c
p.c=null
b=p.a0(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.c7(y,p)
else P.dI(y,p)
return}}p=b.b
b=p.ac()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
dH:{"^":"e:0;a,b",
$0:function(){P.X(this.a,this.b)}},
dM:{"^":"e:0;a,b",
$0:function(){P.X(this.b,this.a.a)}},
dJ:{"^":"e:1;a",
$1:function(a){var z=this.a
z.a=0
z.av(a)}},
dK:{"^":"e:10;a",
$2:function(a,b){this.a.M(a,b)},
$1:function(a){return this.$2(a,null)}},
dL:{"^":"e:0;a,b,c",
$0:function(){this.a.M(this.b,this.c)}},
dP:{"^":"e:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.bI()}catch(w){v=H.B(w)
y=v
x=H.u(w)
if(this.c){v=J.a5(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.ai(y,x)
u.a=!0
return}if(!!J.m(z).$isa7){if(z instanceof P.O&&z.gaE()>=4){if(z.gaE()===8){v=this.b
v.b=z.gbl()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bW(new P.dQ(t))
v.a=!1}}},
dQ:{"^":"e:1;a",
$1:function(a){return this.a}},
dO:{"^":"e:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.bH(this.c)}catch(x){w=H.B(x)
z=w
y=H.u(x)
w=this.a
w.b=new P.ai(z,y)
w.a=!0}}},
dN:{"^":"e:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.bP(z)===!0&&w.e!=null){v=this.b
v.b=w.bD(z)
v.a=!1}}catch(u){w=H.B(u)
y=w
x=H.u(u)
w=this.a
v=J.a5(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.ai(y,x)
s.a=!0}}},
c5:{"^":"b;a,b"},
fU:{"^":"b;"},
fT:{"^":"b;"},
e4:{"^":"b;a,b,c,$ti"},
ai:{"^":"b;J:a>,F:b<",
i:function(a){return H.a(this.a)},
$isp:1},
e5:{"^":"b;"},
ed:{"^":"e:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.aX()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.J(y)
throw x}},
e0:{"^":"e5;",
bU:function(a){var z,y,x,w
try{if(C.b===$.l){x=a.$0()
return x}x=P.cc(null,null,this,a)
return x}catch(w){x=H.B(w)
z=x
y=H.u(w)
return P.aA(null,null,this,z,y)}},
bV:function(a,b){var z,y,x,w
try{if(C.b===$.l){x=a.$1(b)
return x}x=P.cd(null,null,this,a,b)
return x}catch(w){x=H.B(w)
z=x
y=H.u(w)
return P.aA(null,null,this,z,y)}},
ag:function(a,b){if(b)return new P.e1(this,a)
else return new P.e2(this,a)},
bq:function(a,b){return new P.e3(this,a)},
h:function(a,b){return},
aP:function(a){if($.l===C.b)return a.$0()
return P.cc(null,null,this,a)},
ak:function(a,b){if($.l===C.b)return a.$1(b)
return P.cd(null,null,this,a,b)},
bT:function(a,b,c){if($.l===C.b)return a.$2(b,c)
return P.ee(null,null,this,a,b,c)}},
e1:{"^":"e:0;a,b",
$0:function(){return this.a.bU(this.b)}},
e2:{"^":"e:0;a,b",
$0:function(){return this.a.aP(this.b)}},
e3:{"^":"e:1;a,b",
$1:function(a){return this.a.bV(this.b,a)}}}],["","",,P,{"^":"",
d6:function(){return new H.M(0,null,null,null,null,null,0,[null,null])},
V:function(a){return H.eq(a,new H.M(0,null,null,null,null,null,0,[null,null]))},
cV:function(a,b,c){var z,y
if(P.b7(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$a0()
y.push(a)
try{P.ea(a,z)}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=P.bS(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
am:function(a,b,c){var z,y,x
if(P.b7(a))return b+"..."+c
z=new P.b0(b)
y=$.$get$a0()
y.push(a)
try{x=z
x.a=P.bS(x.gG(),a,", ")}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=z
y.a=y.gG()+c
y=z.gG()
return y.charCodeAt(0)==0?y:y},
b7:function(a){var z,y
for(z=0;y=$.$get$a0(),z<y.length;++z)if(a===y[z])return!0
return!1},
ea:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gt(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.l())return
w=H.a(z.gn())
b.push(w)
y+=w.length+2;++x}if(!z.l()){if(x<=5)return
if(0>=b.length)return H.h(b,-1)
v=b.pop()
if(0>=b.length)return H.h(b,-1)
u=b.pop()}else{t=z.gn();++x
if(!z.l()){if(x<=4){b.push(H.a(t))
return}v=H.a(t)
if(0>=b.length)return H.h(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gn();++x
for(;z.l();t=s,s=r){r=z.gn();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.a(t)
v=H.a(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
W:function(a,b,c,d){return new P.dU(0,null,null,null,null,null,0,[d])},
d9:function(a){var z,y,x
z={}
if(P.b7(a))return"{...}"
y=new P.b0("")
try{$.$get$a0().push(a)
x=y
x.a=x.gG()+"{"
z.a=!0
a.bB(0,new P.da(z,y))
z=y
z.a=z.gG()+"}"}finally{z=$.$get$a0()
if(0>=z.length)return H.h(z,-1)
z.pop()}z=y.gG()
return z.charCodeAt(0)==0?z:z},
c9:{"^":"M;a,b,c,d,e,f,r,$ti",
R:function(a){return H.eM(a)&0x3ffffff},
S:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gaL()
if(x==null?b==null:x===b)return y}return-1},
k:{
Y:function(a,b){return new P.c9(0,null,null,null,null,null,0,[a,b])}}},
dU:{"^":"dR;a,b,c,d,e,f,r,$ti",
gt:function(a){var z=new P.c8(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
bt:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.bb(b)},
bb:function(a){var z=this.d
if(z==null)return!1
return this.Z(z[this.Y(a)],a)>=0},
aN:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.bt(0,a)?a:null
else return this.bh(a)},
bh:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.Y(a)]
x=this.Z(y,a)
if(x<0)return
return J.cu(y,x).gax()},
a1:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.b4()
this.b=z}return this.as(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.b4()
this.c=y}return this.as(y,b)}else return this.w(b)},
w:function(a){var z,y,x
z=this.d
if(z==null){z=P.b4()
this.d=z}y=this.Y(a)
x=z[y]
if(x==null)z[y]=[this.a4(a)]
else{if(this.Z(x,a)>=0)return!1
x.push(this.a4(a))}return!0},
U:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.at(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.at(this.c,b)
else return this.bj(b)},
bj:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.Y(a)]
x=this.Z(y,a)
if(x<0)return!1
this.au(y.splice(x,1)[0])
return!0},
I:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
as:function(a,b){if(a[b]!=null)return!1
a[b]=this.a4(b)
return!0},
at:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.au(z)
delete a[b]
return!0},
a4:function(a){var z,y
z=new P.dV(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
au:function(a){var z,y
z=a.gba()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
Y:function(a){return J.ag(a)&0x3ffffff},
Z:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.I(a[y].gax(),b))return y
return-1},
$isf:1,
$asf:null,
k:{
b4:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
dV:{"^":"b;ax:a<,b,ba:c<"},
c8:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.U(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
dR:{"^":"dj;$ti"},
bC:{"^":"b;$ti",
gt:function(a){return new H.bB(a,this.gj(a),0,null)},
D:function(a,b){return this.h(a,b)},
T:function(a,b){return new H.aT(a,b,[null,null])},
i:function(a){return P.am(a,"[","]")},
$isj:1,
$asj:null,
$isf:1,
$asf:null},
da:{"^":"e:11;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.a(a)
z.a=y+": "
z.a+=H.a(b)}},
d7:{"^":"ac;a,b,c,d,$ti",
gt:function(a){return new P.dW(this,this.c,this.d,this.b,null)},
ga2:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
D:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.o(P.aN(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.h(y,w)
return y[w]},
I:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.am(this,"{","}")},
aO:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.bz());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
w:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.ay();++this.d},
ay:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.H(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.c.an(y,0,w,z,x)
C.c.an(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
b6:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.H(z,[b])},
$asf:null,
k:{
aR:function(a,b){var z=new P.d7(null,0,0,0,[b])
z.b6(a,b)
return z}}},
dW:{"^":"b;a,b,c,d,e",
gn:function(){return this.e},
l:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.o(new P.U(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
dk:{"^":"b;$ti",
T:function(a,b){return new H.bq(this,b,[H.aF(this,0),null])},
i:function(a){return P.am(this,"{","}")},
$isf:1,
$asf:null},
dj:{"^":"dk;$ti"}}],["","",,P,{"^":"",
bs:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.J(a)
if(typeof a==="string")return JSON.stringify(a)
return P.cK(a)},
cK:function(a){var z=J.m(a)
if(!!z.$ise)return z.i(a)
return H.aq(a)},
al:function(a){return new P.dF(a)},
aS:function(a,b,c){var z,y
z=H.H([],[c])
for(y=J.aJ(a);y.l();)z.push(y.gn())
return z},
bh:function(a){var z=H.a(a)
H.eN(z)},
eo:{"^":"b;"},
"+bool":0,
f0:{"^":"b;"},
v:{"^":"a3;"},
"+double":0,
ak:{"^":"b;a",
X:function(a,b){return new P.ak(C.a.X(this.a,b.gbd()))},
a3:function(a,b){return C.a.a3(this.a,b.gbd())},
m:function(a,b){if(b==null)return!1
if(!(b instanceof P.ak))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.cJ()
y=this.a
if(y<0)return"-"+new P.ak(-y).i(0)
x=z.$1(C.a.aj(C.a.B(y,6e7),60))
w=z.$1(C.a.aj(C.a.B(y,1e6),60))
v=new P.cI().$1(C.a.aj(y,1e6))
return""+C.a.B(y,36e8)+":"+H.a(x)+":"+H.a(w)+"."+H.a(v)}},
cI:{"^":"e:4;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
cJ:{"^":"e:4;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
p:{"^":"b;",
gF:function(){return H.u(this.$thrownJsError)}},
aX:{"^":"p;",
i:function(a){return"Throw of null."}},
K:{"^":"p;a,b,c,d",
ga6:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ga5:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.a(z)+")":""
z=this.d
x=z==null?"":": "+H.a(z)
w=this.ga6()+y+x
if(!this.a)return w
v=this.ga5()
u=P.bs(this.b)
return w+v+": "+H.a(u)},
k:{
ah:function(a){return new P.K(!1,null,null,a)},
bj:function(a,b,c){return new P.K(!0,a,b,c)}}},
b_:{"^":"K;e,f,a,b,c,d",
ga6:function(){return"RangeError"},
ga5:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.bX()
if(typeof z!=="number")return H.a2(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
k:{
dd:function(a){return new P.b_(null,null,!1,null,null,a)},
as:function(a,b,c){return new P.b_(null,null,!0,a,b,"Value not in range")},
ar:function(a,b,c,d,e){return new P.b_(b,c,!0,a,d,"Invalid value")},
bN:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.ar(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.ar(b,a,c,"end",f))
return b}}},
cM:{"^":"K;e,j:f>,a,b,c,d",
ga6:function(){return"RangeError"},
ga5:function(){if(J.ct(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.a(z)},
k:{
aN:function(a,b,c,d,e){var z=e!=null?e:J.a6(b)
return new P.cM(b,z,!0,a,c,"Index out of range")}}},
F:{"^":"p;a",
i:function(a){return"Unsupported operation: "+this.a}},
c4:{"^":"p;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
au:{"^":"p;a",
i:function(a){return"Bad state: "+this.a}},
U:{"^":"p;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.bs(z))+"."}},
bQ:{"^":"b;",
i:function(a){return"Stack Overflow"},
gF:function(){return},
$isp:1},
cH:{"^":"p;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
dF:{"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.a(z)}},
cL:{"^":"b;a,b",
i:function(a){return"Expando:"+H.a(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.o(P.bj(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.aY(b,"expando$values")
return y==null?null:H.aY(y,z)},
q:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.aY(b,"expando$values")
if(y==null){y=new P.b()
H.bM(b,"expando$values",y)}H.bM(y,z,c)}}},
i:{"^":"a3;"},
"+int":0,
y:{"^":"b;$ti",
T:function(a,b){return H.ao(this,b,H.G(this,"y",0),null)},
am:function(a,b){return P.aS(this,!0,H.G(this,"y",0))},
aR:function(a){return this.am(a,!0)},
gj:function(a){var z,y
z=this.gt(this)
for(y=0;z.l();)++y
return y},
D:function(a,b){var z,y,x
if(b<0)H.o(P.ar(b,0,null,"index",null))
for(z=this.gt(this),y=0;z.l();){x=z.gn()
if(b===y)return x;++y}throw H.c(P.aN(b,this,"index",null,y))},
i:function(a){return P.cV(this,"(",")")}},
cX:{"^":"b;"},
j:{"^":"b;$ti",$asj:null,$isf:1,$asf:null},
"+List":0,
fE:{"^":"b;",
i:function(a){return"null"}},
"+Null":0,
a3:{"^":"b;"},
"+num":0,
b:{"^":";",
m:function(a,b){return this===b},
gp:function(a){return H.E(this)},
i:function(a){return H.aq(this)},
toString:function(){return this.i(this)}},
bR:{"^":"b;"},
N:{"^":"b;"},
"+String":0,
b0:{"^":"b;G:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
k:{
bS:function(a,b,c){var z=J.aJ(b)
if(!z.l())return a
if(c.length===0){do a+=H.a(z.gn())
while(z.l())}else{a+=H.a(z.gn())
for(;z.l();)a=a+c+H.a(z.gn())}return a}}}}],["","",,W,{"^":"",
ei:function(a){var z=$.l
if(z===C.b)return a
return z.bq(a,!0)},
x:{"^":"br;","%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
eX:{"^":"x;",
i:function(a){return String(a)},
$isd:1,
"%":"HTMLAnchorElement"},
eZ:{"^":"x;",
i:function(a){return String(a)},
$isd:1,
"%":"HTMLAreaElement"},
f_:{"^":"x;",$isd:1,"%":"HTMLBodyElement"},
bm:{"^":"x;",$isbm:1,"%":"HTMLCanvasElement"},
f1:{"^":"d;",
i:function(a){return String(a)},
"%":"DOMException"},
br:{"^":"db;",
i:function(a){return a.localName},
$isd:1,
"%":";Element"},
f2:{"^":"bt;J:error=","%":"ErrorEvent"},
bt:{"^":"d;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CompositionEvent|CrossOriginConnectEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ExtendableEvent|FetchEvent|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PointerEvent|PopStateEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent|XMLHttpRequestProgressEvent;Event|InputEvent"},
bu:{"^":"d;","%":"MediaStream;EventTarget"},
fk:{"^":"x;j:length=","%":"HTMLFormElement"},
fm:{"^":"x;",
ah:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
fo:{"^":"x;",$isd:1,"%":"HTMLInputElement"},
ft:{"^":"x;J:error=","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
fD:{"^":"d;",$isd:1,"%":"Navigator"},
db:{"^":"bu;",
i:function(a){var z=a.nodeValue
return z==null?this.b4(a):z},
"%":"Document|HTMLDocument;Node"},
fH:{"^":"x;j:length=","%":"HTMLSelectElement"},
fI:{"^":"bt;J:error=","%":"SpeechRecognitionError"},
dv:{"^":"bu;",
gbp:function(a){var z,y
z=P.a3
y=new P.O(0,$.l,null,[z])
this.be(a)
this.bk(a,W.ei(new W.dw(new P.cb(y,[z]))))
return y},
bk:function(a,b){return a.requestAnimationFrame(H.af(b,1))},
be:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isd:1,
"%":"DOMWindow|Window"},
dw:{"^":"e:1;a",
$1:function(a){this.a.ah(0,a)}},
fW:{"^":"x;",$isd:1,"%":"HTMLFrameSetElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",
eL:function(a,b){var z
if(typeof a!=="number")throw H.c(P.ah(a))
if(typeof b!=="number")throw H.c(P.ah(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0)z=b===0?1/b<0:b<0
else z=!1
if(z||isNaN(b))return b
return a}return a},
dT:{"^":"b;",
K:function(a){if(a<=0||a>4294967296)throw H.c(P.dd("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}}}],["","",,P,{"^":"",eW:{"^":"a8;",$isd:1,"%":"SVGAElement"},eY:{"^":"k;",$isd:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},f3:{"^":"k;",$isd:1,"%":"SVGFEBlendElement"},f4:{"^":"k;",$isd:1,"%":"SVGFEColorMatrixElement"},f5:{"^":"k;",$isd:1,"%":"SVGFEComponentTransferElement"},f6:{"^":"k;",$isd:1,"%":"SVGFECompositeElement"},f7:{"^":"k;",$isd:1,"%":"SVGFEConvolveMatrixElement"},f8:{"^":"k;",$isd:1,"%":"SVGFEDiffuseLightingElement"},f9:{"^":"k;",$isd:1,"%":"SVGFEDisplacementMapElement"},fa:{"^":"k;",$isd:1,"%":"SVGFEFloodElement"},fb:{"^":"k;",$isd:1,"%":"SVGFEGaussianBlurElement"},fc:{"^":"k;",$isd:1,"%":"SVGFEImageElement"},fd:{"^":"k;",$isd:1,"%":"SVGFEMergeElement"},fe:{"^":"k;",$isd:1,"%":"SVGFEMorphologyElement"},ff:{"^":"k;",$isd:1,"%":"SVGFEOffsetElement"},fg:{"^":"k;",$isd:1,"%":"SVGFESpecularLightingElement"},fh:{"^":"k;",$isd:1,"%":"SVGFETileElement"},fi:{"^":"k;",$isd:1,"%":"SVGFETurbulenceElement"},fj:{"^":"k;",$isd:1,"%":"SVGFilterElement"},a8:{"^":"k;",$isd:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},fn:{"^":"a8;",$isd:1,"%":"SVGImageElement"},fr:{"^":"k;",$isd:1,"%":"SVGMarkerElement"},fs:{"^":"k;",$isd:1,"%":"SVGMaskElement"},fF:{"^":"k;",$isd:1,"%":"SVGPatternElement"},fG:{"^":"k;",$isd:1,"%":"SVGScriptElement"},k:{"^":"br;",$isd:1,"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},fK:{"^":"a8;",$isd:1,"%":"SVGSVGElement"},fL:{"^":"k;",$isd:1,"%":"SVGSymbolElement"},dm:{"^":"a8;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},fM:{"^":"dm;",$isd:1,"%":"SVGTextPathElement"},fN:{"^":"a8;",$isd:1,"%":"SVGUseElement"},fO:{"^":"k;",$isd:1,"%":"SVGViewElement"},fV:{"^":"k;",$isd:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},fX:{"^":"k;",$isd:1,"%":"SVGCursorElement"},fY:{"^":"k;",$isd:1,"%":"SVGFEDropShadowElement"},fZ:{"^":"k;",$isd:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,F,{"^":"",
bf:[function(){var z=0,y=new P.cG(),x=1,w,v,u,t,s,r,q,p
var $async$bf=P.eg(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:v=H.eB(document.querySelector("#fractal"),"$isbm")
v.toString
u=v.getContext("2d")
t=P.eL(v.width,v.height)/64
s=Math.pow(64,2)
r=F.bd(64,0)
u.strokeStyle=F.eP()
u.lineWidth=2
u.lineCap="square"
q=0
case 2:if(!!0){z=3
break}u.beginPath()
u.moveTo(r.a*t,r.b*t)
r=F.bd(64,q)
u.lineTo(r.a*t,r.b*t)
u.stroke();++q
if(q>=s){p=$.$get$bi()
u.strokeStyle="rgb("+p.K(240)+","+p.K(240)+","+p.K(240)+")"
r=F.bd(64,0)
q=1}z=4
return P.az(C.w.gbp(window),$async$bf,y)
case 4:z=2
break
case 3:return P.az(null,0,y)
case 1:return P.az(w,1,y)}})
return P.az(null,$async$bf,y)},"$0","cm",0,0,0],
eP:function(){var z=$.$get$bi()
return"rgb("+z.K(240)+","+z.K(240)+","+z.K(240)+")"},
bd:function(a,b){var z,y,x,w,v,u
z=new F.ap(0,0)
for(y=1;y<a;){x=1&C.a.B(b,2)
w=1&b^x
if(w===0){if(x===1){v=y-1
u=new F.ap(v-z.a,v-z.b)}else u=z
u=new F.ap(u.b,u.a)}else u=z
z=new F.ap(y*x+u.a,y*w+u.b)
b=C.a.B(b,4)
y*=2}return z},
ap:{"^":"b;a,b",
i:function(a){return"Point{x: "+this.a+", y: "+this.b+"}"}}},1]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bA.prototype
return J.cZ.prototype}if(typeof a=="string")return J.an.prototype
if(a==null)return J.d_.prototype
if(typeof a=="boolean")return J.cY.prototype
if(a.constructor==Array)return J.a9.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ab.prototype
return a}if(a instanceof P.b)return a
return J.aE(a)}
J.t=function(a){if(typeof a=="string")return J.an.prototype
if(a==null)return a
if(a.constructor==Array)return J.a9.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ab.prototype
return a}if(a instanceof P.b)return a
return J.aE(a)}
J.b9=function(a){if(a==null)return a
if(a.constructor==Array)return J.a9.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ab.prototype
return a}if(a instanceof P.b)return a
return J.aE(a)}
J.er=function(a){if(typeof a=="number")return J.aa.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aw.prototype
return a}
J.es=function(a){if(typeof a=="number")return J.aa.prototype
if(typeof a=="string")return J.an.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aw.prototype
return a}
J.ba=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ab.prototype
return a}if(a instanceof P.b)return a
return J.aE(a)}
J.a4=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.es(a).X(a,b)}
J.I=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).m(a,b)}
J.ct=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.er(a).a3(a,b)}
J.cu=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eI(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.t(a).h(a,b)}
J.cv=function(a,b){return J.ba(a).ah(a,b)}
J.cw=function(a,b){return J.b9(a).D(a,b)}
J.a5=function(a){return J.ba(a).gJ(a)}
J.ag=function(a){return J.m(a).gp(a)}
J.aJ=function(a){return J.b9(a).gt(a)}
J.a6=function(a){return J.t(a).gj(a)}
J.cx=function(a,b){return J.b9(a).T(a,b)}
J.J=function(a){return J.m(a).i(a)}
var $=I.p
C.m=J.d.prototype
C.c=J.a9.prototype
C.a=J.bA.prototype
C.f=J.aa.prototype
C.n=J.an.prototype
C.v=J.ab.prototype
C.j=J.dc.prototype
C.d=J.aw.prototype
C.w=W.dv.prototype
C.k=new H.bp()
C.l=new P.dT()
C.b=new P.e0()
C.e=new P.ak(0)
C.o=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.p=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.h=function(hooks) { return hooks; }

C.q=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.r=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.t=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.u=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.i=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
$.bK="$cachedFunction"
$.bL="$cachedInvocation"
$.w=0
$.T=null
$.bk=null
$.bc=null
$.cf=null
$.co=null
$.aC=null
$.aG=null
$.be=null
$.Q=null
$.Z=null
$.a_=null
$.b6=!1
$.l=C.b
$.bv=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bo","$get$bo",function(){return H.cj("_$dart_dartClosure")},"aO","$get$aO",function(){return H.cj("_$dart_js")},"bx","$get$bx",function(){return H.cT()},"by","$get$by",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.bv
$.bv=z+1
z="expando$key$"+z}return new P.cL(null,z)},"bU","$get$bU",function(){return H.A(H.av({
toString:function(){return"$receiver$"}}))},"bV","$get$bV",function(){return H.A(H.av({$method$:null,
toString:function(){return"$receiver$"}}))},"bW","$get$bW",function(){return H.A(H.av(null))},"bX","$get$bX",function(){return H.A(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"c0","$get$c0",function(){return H.A(H.av(void 0))},"c1","$get$c1",function(){return H.A(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"bZ","$get$bZ",function(){return H.A(H.c_(null))},"bY","$get$bY",function(){return H.A(function(){try{null.$method$}catch(z){return z.message}}())},"c3","$get$c3",function(){return H.A(H.c_(void 0))},"c2","$get$c2",function(){return H.A(function(){try{(void 0).$method$}catch(z){return z.message}}())},"b2","$get$b2",function(){return P.dx()},"a0","$get$a0",function(){return[]},"bi","$get$bi",function(){return C.l}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.N,args:[P.i]},{func:1,args:[,P.N]},{func:1,args:[P.N]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,P.bR]},{func:1,args:[P.i,,]},{func:1,args:[,],opt:[,]},{func:1,args:[,,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.eU(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.q=a.q
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.cq(F.cm(),b)},[])
else (function(b){H.cq(F.cm(),b)})([])})})()