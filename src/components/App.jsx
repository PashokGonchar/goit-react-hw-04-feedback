import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({ Good: 0, Neutral: 0, Bad: 0 });

  const onLeaveFeedback = e =>
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [e]: prevFeedback[e] + 1,
    }));

  const countTotalFeedback = () => {
    return feedback.Good + feedback.Neutral + feedback.Bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback() > 0
      ? ((feedback.Good / countTotalFeedback()) * 100).toFixed(0)
      : '0';
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedback}
          onLeaveFeedback={onLeaveFeedback}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() < 1 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            Good={feedback.Good}
            Neutral={feedback.Neutral}
            Bad={feedback.Bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        )}
      </Section>
    </div>
  );
};
