import React, { useState } from 'react';
import { X, Play, Terminal, Minus, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlaygroundProps {
  isOpen: boolean;
  onClose: () => void;
}

const languages = [
  { name: 'javascript', version: '18.15.0', label: 'JavaScript (Node.js)' },
  { name: 'python', version: '3.10.0', label: 'Python 3' },
  { name: 'cpp', version: '10.2.0', label: 'C++ (GCC)' },
  { name: 'java', version: '15.0.2', label: 'Java' },
  { name: 'bash', version: '5.2.0', label: 'Bash (Linux)' },
];

const Playground: React.FC<PlaygroundProps> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [output, setOutput] = useState<{ text: string; isError: boolean; line?: number } | null>(null);
  const [language, setLanguage] = useState(languages[0]);
  const [isRunning, setIsRunning] = useState(false);

  // Auto-fix for stale HMR state
  React.useEffect(() => {
    if (language.name === 'JavaScript') {
        const correctLang = languages.find(l => l.name === 'javascript') || languages[0];
        setLanguage(correctLang);
    }
  }, [language]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput({ text: 'Running...', isError: false });

    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: language.name,
          version: language.version,
          files: [{ content: code }],
        }),
      });

      const data = await response.json();
      
      if (data.run) {
        const isErr = data.run.code !== 0;
        const outText = data.run.output;
        let errorLine = undefined;

        // Simple regex to try and find line numbers in common error formats
        // JS: :4: / Python: line 4 / C++: :4:12:
        if (isErr) {
            const lineMatch = outText.match(/(?:line\s+(\d+))|(?::(\d+):)/i);
            if (lineMatch) {
                errorLine = parseInt(lineMatch[1] || lineMatch[2]);
            }
        }
        
        setOutput({ text: outText || 'No output', isError: isErr, line: errorLine });
      } else {
        setOutput({ text: `Error: ${data.message || 'Failed to execute code.'}`, isError: true });
      }
    } catch (error) {
      setOutput({ text: 'Error: Could not connect to execution server.', isError: true });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 cursor-none"
        >
          <div className="w-full max-w-4xl h-[80vh] bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden flex flex-col border border-white/10 font-mono text-sm">
            
            {/* Window Header */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 text-gray-400">
                <Terminal size={16} />
                <span className="font-semibold">pawan@portfolio:~/{language.name === 'bash' ? 'terminal' : 'playground'}</span>
              </div>
              <div className="flex items-center gap-3">
                 <button className="text-gray-400 hover:text-white cursor-none"><Minus size={16} /></button>
                 <button className="text-gray-400 hover:text-white cursor-none"><Square size={14} /></button>
                 <button onClick={onClose} className="text-gray-400 hover:text-red-500 cursor-none"><X size={16} /></button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-white/5">
              <select 
                value={language.name}
                onChange={(e) => {
                    const lang = languages.find(l => l.name === e.target.value) || languages[0];
                    setLanguage(lang);
                    setOutput(null); // Clear output on switch
                    
                    // Simple default code snippets
                    if(lang.name === 'python') setCode('print("Hello from Python!")');
                    else if(lang.name === 'cpp') setCode('#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!";\n    return 0;\n}');
                    else if(lang.name === 'java') setCode('public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}');
                    else if(lang.name === 'bash') setCode('echo "Hello from Linux!"\nls -la');
                    else setCode('console.log("Hello, World!");');
                }}
                className="bg-[#3c3c3c] text-white px-3 py-1 rounded outline-none text-xs cursor-none"
              >
                {languages.map((lang) => (
                  <option key={lang.name} value={lang.name}>{lang.label}</option>
                ))}
              </select>

              <button 
                onClick={runCode}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-none
                  ${isRunning ? 'bg-gray-600 text-gray-400 cursor-wait' : 'bg-green-600 text-white hover:bg-green-500'}
                `}
              >
                <Play size={12} fill="currentColor" />
                {isRunning ? 'Running...' : 'Run'}
              </button>
            </div>

            {/* Main Content Info */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0">
                {/* Editor Area */}
                <div className="flex-1 flex flex-col min-h-0 border-r border-white/5 bg-[#1e1e1e] relative group">
                   
                    <textarea 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="absolute inset-0 w-full h-full bg-transparent text-[#d4d4d4] p-4 outline-none resize-none font-mono leading-relaxed cursor-none z-10"
                        spellCheck={false}
                    />
                     {/* Line Number Highlight (Simple Overlay) */}
                     {output?.line && (
                        <div 
                            className="absolute left-0 right-0 bg-red-500/10 border-l-2 border-red-500 pointer-events-none z-0 transition-all font-mono leading-relaxed p-4 text-transparent"
                            style={{ 
                                top: `${(output.line - 1) * 1.5}rem`, // Approx line height calc
                                height: '1.5rem',
                                transform: 'translateY(1rem)' // content padding offset
                            }} 
                        />
                    )}
                </div>

                {/* Output Area */}
                <div className="flex-1 flex flex-col min-h-0 bg-[#0c0c0c] text-gray-300">
                    <div className="p-2 bg-[#252526] text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-white/5 flex justify-between">
                        <span>Terminal Output</span>
                        {output?.isError && output.line && (
                            <span className="text-red-400 animate-pulse">Error at line {output.line}</span>
                        )}
                    </div>
                    <div className={`p-4 font-mono text-sm whitespace-pre-wrap overflow-auto flex-1 ${output?.isError ? 'text-red-400' : 'text-green-400'}`}>
                        {output ? output.text : '// Ready to run...'}
                    </div>
                </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Playground;
