const ProgressStep = ({steps, step }: {steps: Array<string>, step: number}) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center">
                {steps.map((label, index) => (
              <div key={label} className="flex-1">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1 ? 'bg-green-500' :
                    step === index + 1 ? 'bg-sky-500' : 'bg-gray-300'
                  } text-white font-semibold`}>
                    {index + 1}
                  </div>
                  <div className={`flex-1 h-1 ${
                    index < steps.length - 1 ? (step > index + 1 ? 'bg-green-500' : 'bg-gray-300') : 'hidden'
                  }`} />
                </div>
                <div className="text-sm mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
    )
}

export default ProgressStep