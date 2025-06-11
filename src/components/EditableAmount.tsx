import { useState, useRef, useEffect } from "react"

function formatCurrency(value: string) {
  let cleaned = value.replace(/[^\d.,]/g, "")
  cleaned = cleaned.replace(",", ".")
  const numberValue = parseFloat(cleaned)

  if (isNaN(numberValue)) {
    return "R$ 0,00"
  }

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

interface EditableAmountProps {
  value: string
  onChange: (value: string) => void
}

function EditableAmount({ value, onChange }: EditableAmountProps) {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  function handleBlur() {
    onChange(formatCurrency(value))
    setIsEditing(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (/^[\d.,]*$/.test(val)) {
      onChange(val)
    }
  }

  return (
    <div className="w-full">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="w-full border-b border-gray-400 bg-transparent text-black text-3xl font-bold text-center focus:outline-none"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBlur()
            }
          }}
          aria-label="Valor a transferir"
        />
      ) : (
        <span
          className="cursor-pointer text-3xl font-bold text-center block w-full"
          onClick={() => setIsEditing(true)}
          role="textbox"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsEditing(true)
            }
          }}
          aria-label="Clique para editar o valor a transferir"
        >
          {value}
        </span>
      )}
    </div>
  )
}

export default EditableAmount
