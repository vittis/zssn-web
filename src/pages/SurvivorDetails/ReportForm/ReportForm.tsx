import React, { useState } from 'react';
import { Input, Button, Spinner } from 'reactstrap';
import { SurvivorRO } from '../../Survivors/Survivors';

interface ReportFormProps {
  reporter: SurvivorRO;
  survivors: SurvivorRO[];
  onSubmit: (infectedId: string) => Promise<void>;
}

const ReportForm: React.FC<ReportFormProps> = props => {
  const { survivors, reporter, onSubmit } = props;

  const [reportedSurvivor, setReportedSurvivor] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Input
        defaultValue="default"
        onChange={e => setReportedSurvivor(e.target.value)}
        type="select"
      >
        <option disabled value="default">
          Select other survivor...
        </option>

        {survivors.map(s => {
          if (reporter.name !== s.name)
            return (
              <option disabled={s.infected} value={s._id} key={s._id}>
                {s.name}
                {s.infected ? ' - Already infected!' : ''}
              </option>
            );
          return false;
        })}
      </Input>
      {loading && (
        <div className="d-flex w-100 justify-content-center my-2">
          <Spinner color="primary" />
        </div>
      )}
      <Button
        onClick={async () => {
          setLoading(true);
          await onSubmit(reportedSurvivor);
          setLoading(false);
        }}
        outline
        color="primary"
        className="w-100 mt-2"
      >
        Report
      </Button>
    </>
  );
};

export default ReportForm;
