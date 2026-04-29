'use client';

import { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Trash2, FolderGit2 } from 'lucide-react';
import { deleteDatabase, getDecryptedPassword } from '@/app/admin/databases/actions';

export default function DatabaseRow({ database }: { database: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('••••••••');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = async () => {
    if (isVisible) {
      setIsVisible(false);
      setPassword('••••••••');
    } else {
      setIsLoading(true);
      const res = await getDecryptedPassword(database.password_encrypted);
      if (res.success && res.password) {
        setPassword(res.password);
        setIsVisible(true);
      } else {
        alert('Failed to decrypt password');
      }
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    let textToCopy = password;
    if (!isVisible) {
      // Fetch decrypted before copying if hidden
      const res = await getDecryptedPassword(database.password_encrypted);
      if (res.success && res.password) {
        textToCopy = res.password;
      }
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 group flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-1">{database.email}</h3>
        {database.project_name && (
          <div className="flex items-center gap-1.5 text-blue-400 text-sm mb-2">
            <FolderGit2 className="w-4 h-4" />
            <span>{database.project_name}</span>
          </div>
        )}
        {database.notes && <p className="text-gray-500 text-sm mt-2">{database.notes}</p>}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
        <div className="flex items-center gap-2 bg-gray-950 px-4 py-2 rounded-lg border border-gray-800 w-full sm:w-auto">
          <span className="font-mono text-sm text-gray-300 flex-1 sm:w-32 truncate">
            {isLoading ? 'Decrypting...' : password}
          </span>
          <button
            onClick={toggleVisibility}
            disabled={isLoading}
            className="text-gray-500 hover:text-white transition-colors p-1"
            title={isVisible ? 'Hide Password' : 'Show Password'}
          >
            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-white transition-colors p-1"
            title="Copy Password"
          >
            {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <form action={deleteDatabase.bind(null, database.id)} className="w-full sm:w-auto">
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Delete Database"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
