import Clients from "../../models/clients";

const updateClientController = async (
  clientId: string,
  updatedClientData: any
) => {
  try {
    const existingClient = await Clients.findById(clientId);

    if (!existingClient) {
      throw new Error("Cliente no encontrado");
    }

    existingClient.firstName = updatedClientData.firstName;
    existingClient.lastName = updatedClientData.lastName;
    existingClient.email = updatedClientData.email;
    existingClient.phone = updatedClientData.phone;
    existingClient.dni = updatedClientData.dni;
    existingClient.password = updatedClientData.password;

    const updatedClient = await existingClient.save();

    return updatedClient;
  } catch (error) {
    console.error("Error en la actualización del cliente:", error);
    throw error;
  }
};

export default updateClientController;
