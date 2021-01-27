import React from "react";
import "./kanjiDetail.css";


export const KanjiDetails = ({singleKanji}) => {
    console.log(singleKanji);
    console.log(singleKanji === null);
    return (
        <div>
            {singleKanji ?
                <div className="kanji-details">
                    <div className="text-center">
                        <h3>Grade</h3>
                        <p>{singleKanji?.references.grade}</p>
                    </div>
                    <div className="text-center">
                        <h3>Painting</h3>
                        {singleKanji?.kanji.strokes.images.map((image, i) => {
                            return <img key={i} className='painting-image' src={image}/>
                        })}
                        <div>
                            <video width="320" height="240" controls>
                                <source src={singleKanji?.kanji.video.mp4} type="video/mp4"/>
                            </video>
                        </div>
                    </div>

                    <div className='row-double'>
                        <div>
                            <h3>Kunyomi</h3>
                            <p>Hiragana</p>
                            <p className='kanji-text'>{singleKanji?.kanji.kunyomi.hiragana}</p>
                            <p>Romanji</p>
                            <span>{singleKanji?.kanji.kunyomi.romaji}</span>
                        </div>
                        <div>
                            <h3>Onyomi</h3>
                            <p>Katakana</p>
                            <p className='kanji-text'>{singleKanji?.kanji.onyomi.katakana}</p>
                            <p>Romanji</p>
                            <span>{singleKanji?.kanji.onyomi.romaji}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <h3>Meaning</h3>
                        <p className='kanji-text'>{singleKanji?.kanji.meaning.english}</p>
                    </div>
                    <div className='examples'>
                        <h3 className="text-center">Examples</h3>
                        {singleKanji?.examples?.map((example, i) => {
                            return (<div key={i} className="row-third">
                                <p>{example.japanese}</p>
                                <p>{example.meaning.english}</p>
                                <div>
                                    <audio controls>
                                        <source src={example.audio.mp3} type="audio/mpeg"/>
                                        <source src={example.audio.ogg} type="audio/ogg"/>
                                        <source src={example.audio.aac} type="audio/aac"/>
                                        <source src={example.audio.opus} type="audio/opus"/>
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </div>)
                        })}
                    </div>
                    <div>
                        <h3 className="text-center">Radical</h3>
                        <p className='kanji-text text-center'>{singleKanji?.radical.character}</p>
                        {singleKanji?.radical.animation.map((animation, i) => {
                            return <img className="painting-image" key={i} src={animation}/>
                        })}
                    </div>

                </div>
                : ""}
        </div>
    )
}