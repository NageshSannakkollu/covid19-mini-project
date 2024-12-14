import './index.css'

const FaqItem = props => {
  const {faqDetails} = props
  const {answer, question, qno, category} = faqDetails
  return (
    <li key={qno}>
      <div className="question-category-container">
        <p>{question}</p>
        <p className="category">{category}</p>
      </div>
      <p className="answer">{answer}</p>
    </li>
  )
}
export default FaqItem
