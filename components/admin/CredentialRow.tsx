'use client';

import { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Trash2 } from 'lucide-react';
import { deleteCredential, getDecryptedPassword } from '@/app/admin/databases/actions';
import EditCredentialModal from '@/components/admin/EditCredentialModal';

function PasswordField({ encryptedValue, placeholder = '••••••••' }: { encryptedValue: string | null, placeholder?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState(placeholder);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!encryptedValue) {
    return <span className="text-gray-600 text-sm italic">Not set</span>;
  }

  const toggleVisibility = async () => {
    if (isVisible) {
      setIsVisible(false);
      setPassword(placeholder);
    } else {
      setIsLoading(true);
      const res = await getDecryptedPassword(encryptedValue);
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
      const res = await getDecryptedPassword(encryptedValue);
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
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-gray-700 min-w-[100px] max-w-[250px] break-all">
        {isLoading ? '...' : password}
      </span>
      <button
        onClick={toggleVisibility}
        disabled={isLoading}
        className="text-gray-500 hover:text-white transition-colors"
        title={isVisible ? 'Hide Password' : 'Show Password'}
      >
        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
      <button
        onClick={copyToClipboard}
        className="text-gray-500 hover:text-white transition-colors"
        title="Copy Password"
      >
        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default function CredentialRow({ credential }: { credential: any }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors group">
      <td className="p-4 align-top">
        <div className="font-medium text-gray-900">{credential.project_name}</div>
        {credential.notes && (
          <div className="text-xs text-gray-500 mt-1 max-w-[250px] break-words" title={credential.notes}>
            {credential.notes}
          </div>
        )}
      </td>
      <td className="p-4 align-top">
        <PasswordField encryptedValue={credential.project_password_encrypted} />
      </td>
      <td className="p-4 align-top">
        <div className="text-gray-700 text-sm max-w-[250px] break-all" title={credential.email}>
          {credential.email || <span className="text-gray-400 italic">Not set</span>}
        </div>
      </td>
      <td className="p-4 align-top">
        <PasswordField encryptedValue={credential.email_password_encrypted} />
      </td>
      <td className="p-4 align-top text-right whitespace-nowrap">
        <EditCredentialModal credential={credential} />
        <form action={deleteCredential.bind(null, credential.id)} className="inline-block ml-2">
          <button
            type="submit"
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Delete Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </form>
      </td>
    </tr>
  );
}
