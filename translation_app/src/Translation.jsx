import axios from 'axios';
import { useState, useEffect } from 'react';
 
const Translation = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
   const [languageList, setLanguageList] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState('en');

  useEffect(()=>{
    axios.get(`https://libretranslate.de/languages`)
    .then(response=>setLanguageList(response.data))
  },[])
  const handleTranslate = () => {
     axios
      .post('https://libretranslate.de/translate', null, {
        params: {
          q: inputText,
          source: sourceLanguage,
          target: targetLanguage,
        },
      })
      .then((res) => {
        setOutputText(res.data.translatedText);
      })
      .catch((err) => console.log(err));
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <label htmlFor="sourceLanguage" className="block text-lg font-medium text-gray-800 mb-2">
              Source Language:
            </label>
            <select
              id="sourceLanguage"
              className="border border-gray-300 rounded-lg p-2"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              {languageList.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="targetLanguage" className="block text-lg font-medium text-gray-800 mb-2">
              Target Language:
            </label>
            <select
              id="targetLanguage"
              className="border border-gray-300 rounded-lg p-2"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languageList.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="inputText" className="block text-lg font-medium text-gray-800 mb-2">
              Input Text
            </label>
            <textarea
              id="inputText"
              className="w-full h-32 border border-gray-300 rounded-lg p-2"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="outputText" className="block text-lg font-medium text-gray-800 mb-2">
              Output Text
            </label>
            <textarea
              id="outputText"
              className="w-full h-32 border border-gray-300 rounded-lg p-2"
              value={outputText}
              readOnly
            ></textarea>
          </div>
          <div className="flex justify-end mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={handleTranslate}>
              Translate
            </button>
            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">© 2023 Million Translation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Translation;