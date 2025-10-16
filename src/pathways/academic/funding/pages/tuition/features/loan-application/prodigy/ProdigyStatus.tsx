import { InlineLoader } from "../../../../../../../../components/loaders/Loader";
import ContactSupport from "../../../../../../../../components/ContactSupport";
import ContentComponent from "../../../../../../../../components/ContentComponent";
import useTuition from "../../../services/useTuition";
import useProdigy from "../../../services/useProdigy";

const ProdigyStatus: React.FC = () => {
  const { schoolAppId } = useTuition();
  const {
    started,
    status,
    remark,
    feedback,
    isLoading,
    isError,
    refetchStatus,
  } = useProdigy(schoolAppId);

  return (
    <ContentComponent header="Prodigy Loan Status">
      <p>
        Prodigy application has been submitted. Status updates will be shown
        here.
      </p>

      {isLoading && !isError ? (
        <InlineLoader />
      ) : (
        <div className="col p-3 gap-2">
          <div>
            <span className="font-medium">Application Status: </span>
            <span className="px-2 py-1 rounded bg-gray-100">
              {String(status ?? "Pending")}
            </span>
          </div>

          {remark ? (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Remark:</span> {remark}
            </p>
          ) : null}

          {feedback ? (
            <div className="mt-2 text-sm">
              <p className="font-medium">Latest Feedback</p>
              <pre className="bg-gray-50 p-2 rounded overflow-auto">
                {JSON.stringify(feedback, null, 2)}
              </pre>
            </div>
          ) : null}

          <button
            type="button"
            className="text-xs underline self-start mt-2"
            onClick={() => refetchStatus()}
          >
            refresh
          </button>
        </div>
      )}

      <ContactSupport />
    </ContentComponent>
  );
};

export default ProdigyStatus;
