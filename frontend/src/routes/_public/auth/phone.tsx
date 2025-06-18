import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AlertCircle, Phone, Lock } from 'lucide-react'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/auth/phone')({
  component: PhoneLoginPage,
})

export default function PhoneLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const router = useRouter()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Here you would typically call your API to send a verification code
    // For this example, we'll just simulate sending a code after a short delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setCodeSent(true)
    setIsLoading(false)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Here you would typically call your API to verify the code
    // For this example, we'll just simulate verification after a short delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (verificationCode === '123456') {
      router.navigate({ to: '/' }) // Redirect to dashboard on successful login
    } else {
      setError('Invalid verification code')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-start justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Login with Phone
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your phone number to receive a verification code
          </p>
        </div>
        <form
          onSubmit={codeSent ? handleVerifyCode : handleSendCode}
          className="mt-8 space-y-6"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="sr-only">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full pl-10"
                  disabled={codeSent}
                />
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={18}
                />
              </div>
            </div>
            {codeSent && (
              <div>
                <Label htmlFor="code" className="sr-only">
                  Verification Code
                </Label>
                <div className="relative">
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                    className="w-full pl-10"
                  />
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                    size={18}
                  />
                </div>
              </div>
            )}
          </div>
          {error && (
            <div
              className="flex items-center space-x-2 text-red-600"
              role="alert"
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading
              ? 'Processing...'
              : codeSent
                ? 'Verify Code'
                : 'Send Code'}
          </Button>
        </form>
      </div>
    </div>
  )
}
