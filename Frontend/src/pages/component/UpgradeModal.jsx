import { useUpgradePopup } from "../../stores/useUpgradePopup";

const UpgradeModal = () => {
  const { open, feature, closePopup } = useUpgradePopup();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[420px] shadow-xl">
        <h2 className="text-xl font-semibold mb-3">Upgrade to Pro</h2>

        <p className="text-gray-600 mb-6">
          {feature || "This feature"} is available only on the Pro plan.
        </p>

        <div className="flex gap-3">
          <button
            onClick={closePopup}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              window.location.href = "/pricing";
            }}
            className="flex-1 bg-black text-white rounded-lg py-2"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
