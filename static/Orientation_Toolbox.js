
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
/*
 * Toolbox of functions for creating visual memory experiments in js
 *
 */
var objects=new Array();
var selAng = null;
// Make and draw basic objects

function makeLine(id,x1,y1,x2,y2,color,linewidth){
    linewidth = typeof linewidth !== 'undefined' ? linewidth : 2.5;
    color = typeof color !== 'undefined' ? color : '#000000';
    line=new Object();
    line.id=id;
    line.x1=x1;
    line.x2=x2;
    line.y1=y1;
    line.y2=y2;
    line.color=color;
    line.linewidth=linewidth;
    line.type='line';
    objects.push(line);
    return line;
}

function drawLine(ctx,line){
    ctx.beginPath();
    ctx.lineWidth=line.linewidth;
    ctx.strokeStyle=line.color;
    ctx.moveTo(line.x1,line.y1);
    ctx.lineTo(line.x2,line.y2);
    ctx.stroke();
}

function makeText(id,x,y,words,color,style){
    style = typeof style !== 'undefined' ? style : "12px Arial";
    color = typeof color !== 'undefined' ? color : "Black";;
    text=new Object();
    text.id=id;
    text.x=x;
    text.y=y;
    text.color = color;
    text.style = style;
    text.words=words;
    text.type='text';
    objects.push(text);
    return text;
}

function drawText(ctx,text){
    ctx.fillStyle = text.color;
    ctx.font = text.style;
    ctx.fillText(text.words, text.x, text.y);
}

function makeCircle(id,x,y,radius,canMove,lineWidth,color,lineCol,arc1,arc2){
     lineWidth = typeof lineWidth !== 'undefined' ? lineWidth : 0;
     lineCol = typeof lineCol !== 'undefined' ? lineCol : '#000000';
     color = typeof color !== 'undefined' ? color : '#000000';
     arc1 = typeof arc1 !== 'undefined' ? arc1 : 0;
     arc2 = typeof arc2 !== 'undefined' ? arc2 : Math.PI*2;
     canMove = typeof canMove !== 'undefined' ? canMove : false;

     circle=new Object();
     circle.id=id;
     circle.x=x;
     circle.y=y;
     circle.radius=radius;
     circle.color=color;
     circle.lineCol=lineCol;
     circle.lineWidth=lineWidth;
     circle.arc1=arc1;
     circle.arc2=arc2;
     circle.canMove=canMove;
     circle.type='circle';
     objects.push(circle)
     return circle;
}

function drawCircle(ctx,circle){
    // Draw circle outline
     ctx.beginPath();
     ctx.arc(circle.x, circle.y, circle.radius+circle.lineWidth, circle.arc1, circle.arc2, false);
     ctx.lineTo(circle.x,circle.y);
     ctx.fillStyle = circle.lineCol;
     ctx.fill();
     ctx.lineWidth = circle.lineWidth;

     // Draw circle fill
     ctx.strokeStyle=circle.color;
     ctx.fillStyle=circle.color;
     ctx.beginPath();
     ctx.arc(circle.x, circle.y, circle.radius, circle.arc1, circle.arc2, false);
     ctx.lineTo(circle.x,circle.y);
     ctx.fillStyle = circle.color;
     ctx.fill();
     ctx.lineWidth = 0;
     ctx.stroke();
     ctx.closePath();
     return circle;
}

function drawCircle2(ctx,circle){
     // Draw circle fill
     ctx.strokeStyle=circle.color;
     ctx.fillStyle=circle.color;
     ctx.beginPath();
     ctx.arc(circle.x, circle.y, circle.radius, circle.arc1, circle.arc2, false);
     ctx.lineTo(circle.x,circle.y);
     ctx.fillStyle = circle.color;
     ctx.fill();
     ctx.lineWidth = 0;
     ctx.stroke();
     return circle;
}

function overlapCircle(x,y,circle){
    dist=Math.pow(Math.pow(circle.x-x,2)+Math.pow(circle.y-y,2),.5);
    if (dist<=circle.radius){
        return true;
    }else{
        return false;
    }
}


function makeRectangle(id,x,y,width,height,canMove,color,lineCol,lineWidth,rot){
     canMove = typeof canMove !== 'undefined' ? canMove : false;
     color = typeof color !== 'undefined' ? color : '#000000';
     lineCol = typeof lineCol !== 'undefined' ? lineCol : '#000000';
     lineWidth = typeof lineWidth !== 'undefined' ? lineWidth : 0;
     rot = typeof rot !== 'undefined' ? rot : 0;


     rectangle=new Object();
     rectangle.id=id;
     rectangle.x=x;
     rectangle.y=y;
     rectangle.width=width;
     rectangle.height=height;
     rectangle.color=color;
     rectangle.rot=rot;
     rectangle.canMove=canMove
     rectangle.type='rectangle';
     objects.push(rectangle)
     return rectangle;
}

function overlapRectangle(x,y,rectangle){
    x2=x-rectangle.x;
    y2=y-rectangle.y;

    xBound=(x>=rectangle.x-rectangle.width/2 & x<=rectangle.x+rectangle.width/2) | (x<=rectangle.x-rectangle.width/2 & x>=rectangle.x+rectangle.width/2);
    yBound=(y>=rectangle.y-rectangle.height/2 & y<=rectangle.y+rectangle.height/2) | (y<=rectangle.y-rectangle.height/2 & y>=rectangle.y+rectangle.height/2)
    if(xBound & yBound){
        return true;
    }else{
        return false;
    }
}

function makeCrosshair(){
            // Draw rectangles
                makeRectangle('cross1',centerX,centerY,4,12,false,'#000000','#000000');
                makeRectangle('cross2',centerX,centerY,12,4,false,'#000000','#000000');
        }
function makeCrosshaircol(col){
            // Draw rectangles
                makeRectangle('cross1',centerX,centerY,4,12,false,col,col);
                makeRectangle('cross2',centerX,centerY,12,4,false,col,col);
        }
function drawRectangle(ctx,rectangle){
     ctx.fillStyle=rectangle.color;
     ctx.translate(rectangle.x, rectangle.y);
     ctx.rotate(rectangle.rot*Math.PI/180);
     ctx.translate(-rectangle.x, -rectangle.y);
     ctx.fillRect(rectangle.x-rectangle.width/2,rectangle.y-rectangle.height/2,rectangle.width,rectangle.height);


     ctx.translate(rectangle.x, rectangle.y);
     ctx.rotate(-rectangle.rot*Math.PI/180);
     ctx.translate(-rectangle.x, -rectangle.y);
}

function makeIm(id,x,y,width,height,file,canMove,rot){
    rot = typeof rot !== 'undefined' ? rot : 0;
    canMove = typeof canMove !== 'undefined' ? canMove : false;
    image=new Object();
    image.id=id;
    image.x=x;
    image.y=y;
    image.width=width;
    image.height=height;
    image.canMove=canMove;
    thisfile = file;
    image.file=thisfile;
    image.rot=rot;
    image.type='image';
    // objects.push(image);
    return image;
}



function drawIm(ctx,image,border){
    im=new Image();
    const thisim = image;
    im.src=thisim.file;

    im.onload = function(){

        ctx.translate(thisim.x, thisim.y);
        ctx.rotate(thisim.rot*Math.PI/180);
        ctx.translate(-thisim.x, -thisim.y);

        ctx.drawImage(im, thisim.x-thisim.width/2, thisim.y-thisim.height/2,thisim.width,thisim.height);

        ctx.translate(thisim.x, thisim.y);
        ctx.rotate(-thisim.rot*Math.PI/180);
        ctx.translate(-thisim.x, -thisim.y);
    };


}

function drawIma(ctx,image,border){
    ima=new Image();
    const thisim = image;
    ima.src=thisim.file;

    ima.onload = function(){

        ctx.beginPath();
        ctx.translate(thisim.x, thisim.y);
        ctx.rotate(thisim.rot*Math.PI/180);
        ctx.translate(-thisim.x, -thisim.y);

        ctx.drawImage(ima, thisim.x-thisim.width/2, thisim.y-thisim.height/2,thisim.width,thisim.height);

        ctx.translate(thisim.x, thisim.y);
        ctx.rotate(-thisim.rot*Math.PI/180);
        ctx.translate(-thisim.x, -thisim.y);


    };


}
function drawImb(ctx,image,border){
    imb=new Image();
    const thisim = image;
    imb.src=thisim.file;

    imb.onload = function(){

        ctx.beginPath();
        ctx.translate(thisim.x, thisim.y);
        ctx.rotate(thisim.rot*Math.PI/180);
        ctx.translate(-thisim.x, -thisim.y);

        ctx.drawImage(imb, thisim.x-thisim.width/2, thisim.y-thisim.height/2,thisim.width,thisim.height);

        ctx.translate(thisim.x, thisim.y);
        ctx.rotate(-thisim.rot*Math.PI/180);
        ctx.translate(-thisim.x, -thisim.y);

        ctx.beginPath();
        ctx.rect(centerX-2,centerY-6,4,12);
        ctx.rect(centerX-6,centerY-2,12,4);
        ctx.fillStyle="#000000";
        ctx.fill();

    };


}

function makeTriangle(id,x,y,width,height,canMove,color,rot){
     canMove = typeof canMove !== 'undefined' ? canMove : '#000000';
     color = typeof color !== 'undefined' ? color : '#000000';
     rot = typeof rot !== 'undefined' ? rot : 0;

     triangle=new Object();
     triangle.id=id;
     triangle.x=x;
     triangle.y=y;
     triangle.width=width;
     triangle.height=height;
     triangle.color=color;
     triangle.rot=rot;
     triangle.type='triangle';
     triangle.canMove=canMove;
     objects.push(triangle)
     return triangle
}

function drawTriangle(ctx,triangle){
     ctx.fillStyle=triangle.color;
     ctx.translate(triangle.x, triangle.y);
     ctx.rotate(triangle.rot*Math.PI/180);
     ctx.translate(-triangle.x, -triangle.y);

     botLeftX=triangle.x-triangle.width/2;
     botLeftY=triangle.y-triangle.height/2;
     botRightX=triangle.x+triangle.width/2;
     botRightY=triangle.y-triangle.height/2;
     topX=triangle.x;
     topY=triangle.y+triangle.height/2;

     ctx.beginPath();
     ctx.moveTo(botLeftX,botLeftY);
     ctx.lineTo(botRightX,botRightY);
     ctx.lineTo(topX,topY);
     ctx.closePath();
     ctx.fill();

     ctx.translate(triangle.x, triangle.y);
     ctx.rotate(-triangle.rot*Math.PI/180);
     ctx.translate(-triangle.x, -triangle.y);
}

function overlapTriangle(x,y,triangle){
    slopeH=triangle.height/(triangle.width/2)
    slopeW=triangle.width/(triangle.height/2)
    x2=x-triangle.x;
    y2=y-triangle.y;
    xBound=(x2<=y2*slopeH & x2>=-y2*slopeH) | (x2>=y2*slopeH & x2<=-y2*slopeH);
    yBound=(y2<=(triangle.height/2) & y2>=-(triangle.height/2)) | (y2>=(triangle.height/2) & y2<=-(triangle.height/2));
    if(xBound & yBound){
        return true;
    }else{
        return false;
    }
}

function drawObjects(ctx,objects){
    for(i=0;i<objects.length;i++){
        if(objects[i].type=='circle'){
            drawCircle(ctx,objects[i])

        }else if(objects[i].type=='triangle'){
            drawTriangle(ctx,objects[i])
        }else if(objects[i].type=='line'){
            drawLine(ctx,objects[i])
        }else if(objects[i].type=='image'){
            drawIm(ctx,objects[i])
        }else if(objects[i].type=='rectangle'){
            drawRectangle(ctx,objects[i])
        }else if(objects[i].type=='text'){
            drawText(ctx,objects[i])
        }

    }

}

function drawGrid(ctx,numCol,numRow){
   numCol = typeof numCol !== 'undefined' ? numCol : 10;
   numRow = typeof numRow !== 'undefined' ? numRow : 5;
   ctx.fillStyle='#000000';
   ctx.strokeStyle='#000000';
   width=ctx.canvas.width;
   wShift=width/numCol;
   height=ctx.canvas.height;
   hShift=height/numRow;
   // Draw columns
   for(i=0;i<numCol;i++){
        ctx.beginPath();
        ctx.moveTo(wShift*i,0);
        ctx.lineTo(wShift*i,height);
        ctx.closePath();
        ctx.stroke()
        ctx.fillText(wShift*i,wShift*i,10)
   }
   for( j=0;j<numRow;j++){
        ctx.beginPath();
        ctx.moveTo(0,hShift*j);
        ctx.lineTo(width,hShift*j);
        ctx.closePath();
        ctx.stroke()
        ctx.fillText(hShift*j,5,hShift*j)
   }
}

function erase(ctx){
    width=ctx.canvas.width;
    height=ctx.canvas.height;
    ctx.fillStyle='#808080';
    ctx.fillRect(0,0,width,height);
}

function clear(){
    objects=new Array();
}

// Detect clicks
var sel=false;

// Allow rotations
var ad_KeyRotate=false;
var rotRate=10;

// Allow object movement
var mousemove_moveObject=true;

// Allow size changes
var ws_changeSize=false;
var heightRate=2.5;
var widthRate=2.5;
var radRate=2.5;


$(document).keypress(function(e) {

});

$(document).on("mousedown", function(e) {
    inBound=e.toElement.id=='myCanvas';
    hasMoved=moveLast>0;
    waitTime=endTime();
    hasWaited=waitTime>150;
    if(isTest & inBound & hasMoved & hasWaited){

        moveLast=0;
        rt.push(endTime());
        startTime();

        // currProbe++;
        erase(ctx1);
        clear();

        // moveCue(order[currProbe]);
        // drawObjects(ctx1,objects);
        // document.getElementById('instr').innerHTML='';
        // if(currProbe<numDots){
            isTest = false;

            allcolAng.push(JSON.stringify(selAng));

            // document.getElementById('targ').value=JSON.stringify(color);
            document.getElementById('targAng').value=JSON.stringify(targAng);
            document.getElementById('respAng').value=JSON.stringify(selAng);
            document.getElementById('rt').value=JSON.stringify(rt);
            trialIsOver();
            //nextPage();
        // }
    }else if(isTest & !hasMoved){
        // document.getElementById('instr').innerHTML='Please move the mouse before clicking';
    }else if(isTrain){
        showPractice_f5()
        isTrain = false;
        // var isTrain = stopTrain();
        // function stopTrain(){isTrain = false; return isTrain;}

    }

});

$(document).on("mouseup", function(e) {

});

$(document).on("mousemove", function(e) {
    // console.log(isTrain)
    inBound=e.toElement.id=='myCanvas';
    if(isTest & inBound | isTrain){

        xdif=e.offsetX-centerX;
        ydif=e.offsetY-centerY;

        dist=Math.pow(Math.pow(xdif,2)+Math.pow(ydif,2),.5);

        nubX=wheelRad*Math.cos(Math.acos(xdif/dist))
        nubY=wheelRad*Math.sin(Math.asin(ydif/dist))

        // From Tim B.
        // a = 9.0 + 50.0*cos(w/180*pi);
        // b = 9.0 + 50.0*sin(w/180*pi);

        wTemp= -Math.acos(xdif/dist);
        if(ydif>0){
            wTemp=2*Math.PI-wTemp;
        }


        selAng= wrap([(wTemp)*(180/Math.PI)],90)[0];

        if(selAng!=null){
            moveLast =1;
        }


        erase(ctx1);
        clear();
        makeColorWheelBW();
        // makeCrosshair();
        makeColorNub();
        // makeProbe(curprobe);
        // - makeNumberCue(curprobe) changed to make crosshair
        makeCrosshair();
        drawObjects(ctx1,objects);
    }

});

function checkOverlap(x,y,objects){
    over=[]
    for(i=0;i<objects.length;i++){
        if(objects[i].type=='circle'){
            overlap=overlapCircle(x,y,objects[i])
        }else if(objects[i].type=='rectangle'){
            overlap=overlapRectangle(x,y,objects[i])
        }else if(objects[i].type=='triangle'){
            overlap=overlapTriangle(x,y,objects[i])
        }else if(objects[i].type=='image'){
            overlap=overlapRectangle(x,y,objects[i])
        }
        if(overlap){
            over.push(i);
        }
    }
    return over;
}

function feedback(thiserr){

          if (thiserr<=10){
              makeCrosshaircol('#b4fa84');
          }else if(thiserr<=25){
              makeCrosshaircol('#FFFF99');
          }else if(thiserr>25){
              makeCrosshaircol('#ff0000');
          }
        }

// Timing functions

function wait(time,func){
    setTimeout(function(){func},time);
}

// Probability

function normRand() {
    var x1, x2, rad;

    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while(rad >= 1 || rad == 0);

    var c = Math.sqrt(-2 * Math.log(rad) / rad);

    return x1 * c;
};

function changeInnerHTML(id,text){
            document.getElementById(id).innerHTML=text;
}

// Load multiple images
// http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
      images[src].src = sources[src];
    }
    return images;
}


function loadImages2(){
// Insert code that actually loads images
}

function nextPage(){
    document.nextpage.submit();
}

function angle2HEX(wholeDegree){

    w=wholeDegree*(Math.PI/180); // Round to integer degree
    l=65;
    a = 9.0 + 50.0*Math.cos(w);
    b = 9.0 + 50.0*Math.sin(w);
    image=[l,a,b];

    whitePoint = [0.950456,1,1.088754];

    fY=(image[0]+16)/116;
    fX=fY+image[1]/500;
    fZ=fY-image[2]/200

    function invf(fi){
        Y=Math.pow(fi, 3);
        i=(Y<.008856);
        if(i){
            Y=(fi-(4/29))*(108/841);
        }
        return Y;
    }

//           Convert from cie lab to cie xyz
//           fY = (Image(:,:,1) + 16)/116;
//            fX = fY + Image(:,:,2)/500;
//            fZ = fY - Image(:,:,3)/200;
//            Image(:,:,1) = WhitePoint(1)*invf(fX);  % X
//            Image(:,:,2) = WhitePoint(2)*invf(fY);  % Y
//            Image(:,:,3) = WhitePoint(3)*invf(fZ);  % Z
// invf
//          Y = fY.^3;
//          i = (Y < 0.008856);
//          Y(i) = (fY(i) - 4/29)*(108/841);

    image2=[];
    image2[0]=whitePoint[0]*invf(fX);
    image2[1]=whitePoint[1]*invf(fY);
    image2[2]=whitePoint[2]*invf(fZ);



//   T = [3.240479,-1.53715,-0.498535;-0.969256,1.875992,0.041556;0.055648,-0.204043,1.057311];
//   R = T(1)*Image(:,:,1) + T(4)*Image(:,:,2) + T(7)*Image(:,:,3);  % R
//   G = T(2)*Image(:,:,1) + T(5)*Image(:,:,2) + T(8)*Image(:,:,3);  % G
//   B = T(3)*Image(:,:,1) + T(6)*Image(:,:,2) + T(9)*Image(:,:,3);  % B
    T=[3.240479,-0.969256,0.055648,-1.53715,1.875992,-0.204043,-0.498535,0.041556,1.057311];
    R = T[0]*image2[0] + T[3]*image2[1] + T[6]*image2[2];
    G = T[1]*image2[0] + T[4]*image2[1] + T[7]*image2[2];
    B = T[2]*image2[0] + T[5]*image2[1] + T[8]*image2[2];

//   % Desaturate and rescale to constrain resulting RGB values to [0,1]
//   AddWhite = -min(min(min(R,G),B),0);
//   Scale = max(max(max(R,G),B)+AddWhite,1);
//   R = (R + AddWhite)./Scale;
//   G = (G + AddWhite)./Scale;
//   B = (B + AddWhite)./Scale;

    AddWhite = -Math.min(Math.min(Math.min(R,G),B),0);
    Scale = Math.max(Math.max(Math.max(R,G),B)+AddWhite,1);
    R = (R + AddWhite)/Scale;
    G = (G + AddWhite)/Scale;
    B = (B + AddWhite)/Scale;

//  function Rp = gammacorrection(R)
//  Rp = real(1.099*R.^0.45 - 0.099);
//  i = (R < 0.018);
//  Rp(i) = 4.5138*R(i);
    function gammacorrection(R){
        Rp=(1.099*Math.pow(R,0.45) - 0.099);// See if we need the real function
        i=R<.018
        if(i){
            Rp=4.5138*R
        }
        return Rp;
    }

//   % Apply gamma correction to convert RGB to Rec. 709 R'G'B'
//   Image(:,:,1) = gammacorrection(R);  % R'
//   Image(:,:,2) = gammacorrection(G);  % G'
//   Image(:,:,3) = gammacorrection(B);  % B'

    newColorRGB=[];
    newColorRGB[0]=gammacorrection(R);
    newColorRGB[1]=gammacorrection(G);
    newColorRGB[2]=gammacorrection(B);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }


    newColorHex=rgbToHex(Math.round(255*newColorRGB[0]), Math.round(255*newColorRGB[1]), Math.round(255*newColorRGB[2]));

    return newColorHex;
}
